FactoryBot.define do
  factory :buddy do
    user { FactoryBot.create(:user) }
    buddy { FactoryBot.create(:user) }
  end
end
