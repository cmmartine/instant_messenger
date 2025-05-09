# frozen_string_literal: true

class Chatroom < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_and_belongs_to_many :users

  def self.with_user_ids(chatrooms)
    chatrooms.map do |room|
      {
        id: room.id,
        active_status: room.active_status,
        user_ids: room.users.map(&:id)
      }
    end
  end

  def most_recent_non_current_user_message_status(current_user_id)
    non_current_user_messages = messages.where('user_id != ?', current_user_id)
    !non_current_user_messages.empty? ? non_current_user_messages.last.read_status : true
  end

  def set_to_inactive
    return unless (no_messages? && created_more_than_a_week_ago?) || latest_message_a_week_ago?

    update!(active_status: false)
  end

  private

  def latest_message_a_week_ago?
    latest_message = messages.last
    return nil unless latest_message

    latest_message.created_at.before?(1.week.ago)
  end

  def no_messages?
    messages.empty?
  end

  def created_more_than_a_week_ago?
    created_at.before?(1.week.ago)
  end
end
