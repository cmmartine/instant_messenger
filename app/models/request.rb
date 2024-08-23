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
end
