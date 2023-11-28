FactoryBot.define do
  factory :user do
    email { "testemail@chatroom.com" }
    password { "Password1!" }
    password_confirmation { "Password1!" }
    username { "test_user" }
  end
end