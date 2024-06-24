# frozen_string_literal: true

require 'net/http'

class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chatroom

  def update_read_status
    if read_status == false
      update(read_status: true)
    end
  end

  def self.send_message_to_chatbot(message)
    host = ENV.fetch('HOST', 'http://localhost:7860')
    uri = URI(host)

    input = { "instruction_nochat": message.body }

    req = Net::HTTP.post(uri, input)
    response = JSON.parse(req.body)

    response['response']
  end
end
