# frozen_string_literal: true

class Chatroom < ApplicationRecord
  has_many :messages
  has_and_belongs_to_many :users

  def most_recent_non_current_user_message_status(current_user_id)
    non_current_user_messages = messages.where('user_id != ?', current_user_id)
    !non_current_user_messages.empty? ? non_current_user_messages.last.read_status : true
  end
end
