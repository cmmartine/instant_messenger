FactoryBot.define do
  factory :user do
    sequence(:email) { |n|"testemail#{n}@chatroom.com" }
    password { 'Password1!' }
    password_confirmation { 'Password1!' }
    sequence(:username) { |n| "test_user#{n}" }
  end
end
