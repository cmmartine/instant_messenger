class SendAiMessageJob < ApplicationJob
  def perform(message)
    ai_response = `python3 app/jobs/h2oai_api.py '#{message[:body]}'`
    no_ai_response_msg = 'Chatbot is currently unavailable, please try again later.'
    ai_response == '' ? no_ai_response_msg : ai_response
  end
end
