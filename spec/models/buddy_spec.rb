require 'rails_helper'

RSpec.describe Buddy, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:buddy) }
  end

  describe 'validations' do
    subject { FactoryBot.create(:buddy) }
    it { should validate_uniqueness_of(:user_id).scoped_to(:buddy_id) }
  end

  describe 'self.filter_to_usernames_and_ids' do
    let!(:buddy_relation) { FactoryBot.create(:buddy) }
    it 'filters an array of buddies down to each buddies id and username' do
      users_buddies = User.first.buddies
      filtered_buddies = Buddy.filter_to_usernames_and_ids(users_buddies)
      expect(filtered_buddies).to eq([{ id: User.last.id, username: User.last.username }])
    end
  end
end
