class Buddy < ApplicationRecord
  belongs_to :user
  belongs_to :buddy, class_name: :User

  validates :user_id, uniqueness: { scope: :buddy_id }

  def self.filter_to_usernames_and_ids(buddy_array)
    buddy_array.map do |buddy|
      user = User.find(buddy.buddy_id)
      {
        id: user.id,
        username: user.username
      }
    end
  end
end
