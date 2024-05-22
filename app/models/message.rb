# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chatroom

  def update_read_status_to_true(message_id)
    Message.update(message_id, :read_status => true)
  end
end
