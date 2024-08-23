require 'rails_helper'

RSpec.describe Buddy, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:buddy) }
  end

  describe 'validations' do
    subject { FactoryBot.create(:buddy)}
    it { should validate_uniqueness_of(:user_id).scoped_to(:buddy_id) }
  end
end
