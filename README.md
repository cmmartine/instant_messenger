# README

## First time set up
Run the following:
`docker compose build`
`docker compose run --rm rails bin/rails db:create`
`docker compose run --rm rails bin/rails db:migrate`
`docker compose run --rm rails bin/rails db:seed`
Then `docker compose up` can be used when starting the application

## H2OAI Setup - to enable the chatbot
See the following link if you encounter any trouble while following the below steps https://github.com/h2oai/h2ogpt#get-started

### Linux
Run the following in your terminal:
`export PIP_EXTRA_INDEX_URL="https://download.pytorch.org/whl/cu121 https://huggingface.github.io/autogptq-index/whl/cu121"`

`CMAKE_ARGS="-DLLAMA_BLAS=ON -DLLAMA_BLAS_VENDOR=OpenBLAS" pip install llama-cpp-python`

   #### Then run the following commands on any system:
   `git clone https://github.com/h2oai/h2ogpt.git`
   `cd h2ogpt`
   `pip install -r requirements.txt`
   `pip install -r reqs_optional/requirements_optional_langchain.txt`

   `pip uninstall llama_cpp_python llama_cpp_python_cuda -y`
   `pip install -r reqs_optional/requirements_optional_llamacpp_gpt4all.txt --no-cache-dir`

   `pip install -r reqs_optional/requirements_optional_langchain.urls.txt`
   #### GPL, only run next line if that is ok:
   `pip install -r reqs_optional/requirements_optional_langchain.gpllike.txt`

   #### choose up to 32768 if have enough GPU memory:
   `python3 generate.py --base_model=TheBloke/Mistral-7B-Instruct-v0.2-GGUF --prompt_type=mistral --max_seq_len=4096`
