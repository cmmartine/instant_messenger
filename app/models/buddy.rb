class Buddy < ApplicationRecord
  belongs_to :user
  belongs_to :buddy, class_name: :User

  validates :user_id, uniqueness: { scope: :buddy_id }
end
