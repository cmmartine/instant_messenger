# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  after_create :add_chatbot_buddy

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

  def add_chatbot_buddy
    chatbot = User.find_by(username: 'Chatbot')
    chatbot ? Buddy.create!(user_id: id, buddy_id: chatbot.id) : nil
  end

  def self.search(user_input)
    where(['lower(username) LIKE ?', "%#{user_input.downcase}%"]).select(:id, :username)
  end

  def open_request_with_user?(user_id)
    matching_sent_request = sent_requests.find_by('receiving_user_id = ?', user_id)
    matching_received_request = received_requests.find_by('sending_user_id = ?', user_id)
    matching_sent_request || matching_received_request ? true : false
  end

  def pending_received_requests
    received_requests.where('status = ?', 'pending')
  end

  private

  def password_complexity
    return if password.blank? || password =~ /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/

    errors.add :password, 'Complexity requirement not met. Please use: 1 uppercase, 1 lowercase, 1 digit and 1 special character'
  end
end
