require 'rails_helper'

RSpec.describe RequestsController, type: :controller do
  describe 'POST pending_request' do
    login_user

    request_params = {
      request: {
        user_id: 2
      }
    }

    before do
      FactoryBot.create(:user)
    end

    it 'returns true if there is a pending request' do
      Request.create(sending_user_id: 1, receiving_user_id: 2)
      post :pending_request, params: request_params, as: :json
      expect(response.body).to eq('true')
    end

    it 'returns false if there is NOT a pending request' do
      post :pending_request, params: request_params, as: :json
      expect(response.body).to eq('false')
    end
  end

  describe 'POST accept' do
    login_user

    request_params = {
      request: {
        request_id: 1
      }
    }

    let!(:user1) { User.first }
    let!(:user2) { FactoryBot.create(:user) }
    let!(:request) { Request.create(sending_user_id: user2.id, receiving_user_id: user1.id) }

    it 'updates the requests status to accepted' do
      expect(request.status).to eq('pending')
      post :accept, params: request_params, as: :json
      request.reload
      expect(request.status).to eq('accepted')
    end

    it 'creates buddy relationships for both users in the request' do
      post :accept, params: request_params, as: :json
      expect(user1.buddies[0].user_id).to eq(user1.id)
      expect(user1.buddies[0].buddy_id).to eq(user2.id)
      expect(user2.buddies[0].user_id).to eq(user2.id)
      expect(user2.buddies[0].buddy_id).to eq(user1.id)
    end
  end

  describe 'POST reject' do
    login_user

    request_params = {
      request: {
        request_id: 1
      }
    }

    let!(:user1) { User.first }
    let!(:user2) { FactoryBot.create(:user) }
    let!(:request) { Request.create(sending_user_id: user2.id, receiving_user_id: user1.id) }

    it 'deletes the associated request' do
      expect(request.status).to eq('pending')
      post :reject, params: request_params, as: :json
      expect { request.reload }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
