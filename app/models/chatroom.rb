# frozen_string_literal: true

class Chatroom < ApplicationRecord
  has_many :messages
  has_and_belongs_to_many :users

  def most_recent_non_current_user_message_status(current_user_id)
    non_current_user_messages = messages.where('user_id != ?', current_user_id)
    !non_current_user_messages.empty? ? non_current_user_messages.last.read_status : true
  end

  def set_to_inactive
    return unless no_messages? || latest_message_a_week_ago?

    update!(active_status: false)
  end

  private

  def latest_message_a_week_ago?
    latest_message = messages.last
    latest_message.created_at.before?(1.week.ago)
  end

  def no_messages?
    messages.empty?
  end
end
