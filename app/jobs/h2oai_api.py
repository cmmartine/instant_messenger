import sys, os, ast
from gradio_client import Client
from contextlib import contextmanager

def send_ai_message():
  with suppress_stdout():
    client = Client(os.getenv('HOST', "http://localhost:7860"))

  kwargs = dict(instruction_nochat=sys.argv[1])
  res = client.predict(str(dict(kwargs)), api_name='/submit_nochat_api')

  response = ast.literal_eval(res)['response']
  print(response)

@contextmanager
def suppress_stdout():
    with open(os.devnull, "w") as devnull:
        old_stdout = sys.stdout
        sys.stdout = devnull
        try:  
            yield
        finally:
            sys.stdout = old_stdout

send_ai_message()