class SendAiMessageJob < ApplicationJob
  def perform(message)
    `python3 app/jobs/h2oai_api.py '#{message[:body]}'`
  end
end
