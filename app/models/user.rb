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

  private

  def password_complexity
    return if password.blank? || password =~ /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/

    errors.add :password, 'Complexity requirement not met. Please use: 1 uppercase, 1 lowercase, 1 digit and 1 special character'
  end
end
