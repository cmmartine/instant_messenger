FROM ruby:3.2.2

RUN apt-get update -qq && apt-get install -y build-essential supervisor apt-utils libpq-dev gcc git curl make pip
WORKDIR /home

ENV PYENV_ROOT .pyenv
ENV PATH $PYENV_ROOT/shims:$PYENV_ROOT/bin:$PATH

RUN git clone https://github.com/pyenv/pyenv.git .pyenv
RUN echo 'export PYENV_ROOT="/home/.pyenv"' >> ~/.bashrc
RUN echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
RUN echo 'eval "$(pyenv init -)"' >> ~/.bashrc
RUN bash -i -c "source ~/.bashrc"
RUN pyenv install 3.10
RUN pyenv global 3.10

RUN export PIP_EXTRA_INDEX_URL="https://download.pytorch.org/whl/cu121 https://huggingface.github.io/autogptq-index/whl/cu121"
RUN CMAKE_ARGS="-DLLAMA_BLAS=ON -DLLAMA_BLAS_VENDOR=OpenBLAS" pip install llama-cpp-python
RUN git clone https://github.com/h2oai/h2ogpt.git
WORKDIR /home/h2ogpt
RUN pip install -r requirements.txt --break-system-packages
RUN pip install -r reqs_optional/requirements_optional_langchain.txt --break-system-packages
RUN pip uninstall llama_cpp_python llama_cpp_python_cuda -y --break-system-packages
RUN pip install -r reqs_optional/requirements_optional_llamacpp_gpt4all.txt --no-cache-dir --break-system-packages
RUN pip install -r reqs_optional/requirements_optional_langchain.urls.txt --break-system-packages
RUN pip install -r reqs_optional/requirements_optional_langchain.gpllike.txt --break-system-packages

WORKDIR /home
ENV NODE_VERSION=18.0.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

WORKDIR /instant-messenger

COPY Gemfile* .

COPY package.json .

RUN gem install bundler:$(cat Gemfile.lock | tail -1 | tr -d " ")

RUN bundle install

RUN npm install

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

ARG DEFAULT_PORT 3000
ARG H2OAI_PORT 7860

EXPOSE ${DEFAULT_PORT} ${H2OAI_PORT}

COPY docker-bin/. /usr/bin/
COPY docker-bin/h2oai/startup_ai.sh /home/h2ogpt/

RUN chmod +x /usr/bin/startup.sh
RUN chmod +x /usr/bin/install-chrome.sh
RUN chmod +x /home/h2ogpt/startup_ai.sh

ENTRYPOINT ["startup.sh"]