FROM ruby:3.2.2

RUN apt-get update -qq && apt-get install -y build-essential supervisor python3 pip apt-utils libpq-dev curl

ENV NODE_VERSION=16.13.0
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

EXPOSE ${DEFAULT_PORT}

COPY docker-bin/. /usr/bin/

RUN chmod +x /usr/bin/startup.sh

ENTRYPOINT ["startup.sh"]