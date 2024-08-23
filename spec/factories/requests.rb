FactoryBot.define do
  factory :request do
    sending_user { FactoryBot.create(:user) }
    receiving_user { FactoryBot.create(:user) }
  end
end
