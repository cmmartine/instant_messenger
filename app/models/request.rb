# frozen_string_literal: true

class Request < ApplicationRecord
  belongs_to :sending_user, class_name: :User
  belongs_to :receiving_user, class_name: :User

  STATUSES = {
    'pending': 'pending',
    'accepted': 'accepted'
  }.freeze

  validates :sending_user_id, uniqueness: { scope: :receiving_user_id }
  validates :receiving_user_id, uniqueness: { scope: :sending_user_id }
  validates :status, inclusion: { in: STATUSES.values }

  def self.ids_and_noncurrent_usernames(requests, current_user_id)
    requests.map do |request|
      {
        id: request.id,
        username: request.noncurrent_user(current_user_id).username
      }
    end
  end

  def noncurrent_user(current_user_id)
    sending_user_id == current_user_id ? User.find(receiving_user_id) : User.find(sending_user_id)
  end
end
