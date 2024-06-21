import os
import ast
from gradio_client import Client

def send_ai_message(message):
  client = Client(os.getenv('HOST', "http://localhost:7860"))

  # string of dict for input
  kwargs = dict(instruction_nochat=message)
  res = client.predict(str(dict(kwargs)), api_name='/submit_nochat_api')

  # string of dict for output
  response = ast.literal_eval(res)['response']
  return response
