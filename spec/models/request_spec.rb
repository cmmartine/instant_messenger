require 'rails_helper'

STATUSES = {
  'pending': 'pending',
  'accepted': 'accepted'
}.freeze

RSpec.describe Request, type: :model do
  describe 'associations' do
    it { should belong_to(:sending_user) }
    it { should belong_to(:receiving_user) }
  end

  describe 'validations' do
    subject { FactoryBot.create(:request) }
    it { should validate_uniqueness_of(:sending_user_id).scoped_to(:receiving_user_id) }
    it { should validate_uniqueness_of(:receiving_user_id).scoped_to(:sending_user_id) }
    it { should validate_inclusion_of(:status).in_array(%w[pending accepted]) }
  end
end
