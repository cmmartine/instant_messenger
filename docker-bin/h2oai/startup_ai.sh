#!/bin/bash

cd /home/h2ogpt/
echo "Starting AI"
python3 generate.py --base_model=TheBloke/Mistral-7B-Instruct-v0.2-GGUF --prompt_type=mistral --max_seq_len=4096