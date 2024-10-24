FactoryBot.define do
  factory :buddy do
    user_id { FactoryBot.create(:user).id }
    buddy_id { FactoryBot.create(:user).id }
  end
end
