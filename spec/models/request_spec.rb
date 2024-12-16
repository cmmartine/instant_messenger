require 'rails_helper'

STATUSES = Constants::REQUEST_STATUSES

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

  describe 'self.ids_and_noncurrent_usernames' do
    let!(:current_user) { FactoryBot.create(:user) }
    let!(:first_other_user) { FactoryBot.create(:user) }
    let!(:second_other_user) { FactoryBot.create(:user) }
    let!(:first_request) { Request.create(sending_user_id: first_other_user.id, receiving_user_id: current_user.id) }
    let!(:second_request) { Request.create(sending_user_id: second_other_user.id, receiving_user_id: current_user.id) }

    context 'when only one request is in the array argument' do
      it 'returns an array containing the requests id and noncurrent_users username' do
        expect(Request.ids_and_noncurrent_usernames([first_request], current_user.id)).to eq(
          [
            {
              id: first_request.id,
              username: first_other_user.username
            }
          ]
        )
      end
    end

    context 'when there is more than one request in the array argument' do
      it 'returns an array containing the request ids and noncurrent_users usernames' do
        expect(Request.ids_and_noncurrent_usernames([first_request, second_request], current_user.id)).to eq(
          [
            {
              id: first_request.id,
              username: first_other_user.username
            },
            {
              id: second_request.id,
              username: second_other_user.username
            }
          ]
        )
      end
    end
  end
end
