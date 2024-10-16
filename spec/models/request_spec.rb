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

  describe 'self.ids_and_noncurrent_usernames' do
    current_user = nil
    first_other_user = nil
    second_other_user = nil
    first_request = nil
    second_request = nil

    before do
      current_user = User.create(id: 1, username: 'Bianca', email: 'bianca1@chatroom.com', password: 'Bianca1!', password_confirmation: 'Bianca1!')
      first_other_user = User.create(id: 2, username: 'Brittney', email: 'brittney1@chatroom.com', password: 'Brittney1!', password_confirmation: 'Brittney1!')
      second_other_user = User.create(id: 3, username: 'Cleetus', email: 'cleetus1@chatroom.com', password: 'Cleetus1!', password_confirmation: 'Cleetus1!')
      first_request = Request.create(sending_user_id: first_other_user.id, receiving_user_id: current_user.id)
      second_request = Request.create(sending_user_id: second_other_user.id, receiving_user_id: current_user.id)
    end
 
 
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
