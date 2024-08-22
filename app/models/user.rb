# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :username, presence: true, uniqueness: true, length: { in: 3..20 }
  validate :password_complexity

  has_many :messages
  has_and_belongs_to_many :chatrooms
  has_many :buddies, class_name: :Buddy, foreign_key: :user_id, dependent: :destroy
  has_many :sent_requests, class_name: :Request, foreign_key: :sending_user_id, dependent: :destroy
  has_many :received_requests, class_name: :Request, foreign_key: :receiving_user_id, dependent: :destroy

  def self.chatbot_id
    find_by(username: 'Chatbot').id
  end

  def self.search(user_input)
    where(['lower(username) LIKE ?', "%#{user_input.downcase}%"])
  end

  def self.filter_search_to_name_and_id(search_results)
    search_results.map do |user|
      {
        id: user.id,
        username: user.username
      }
    end
  end

  def open_request_with_user?(user_id)
    matching_sent_request = sent_requests.find_by('receiving_user_id = ?', user_id)
    matching_received_request = received_requests.find_by('sending_user_id = ?', user_id)
    matching_sent_request || matching_received_request ? true : false
  end

  private

  def password_complexity
    return if password.blank? || password =~ /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/

    errors.add :password, 'Complexity requirement not met. Please use: 1 uppercase, 1 lowercase, 1 digit and 1 special character'
  end
end
