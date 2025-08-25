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

    let(:request_params) do
      {
        request: {
          request_id: request.id
        }
      }
    end

    let(:invalid_request_params) do
      {
        request: {
          request_id: second_request.id
        }
      }
    end

    let!(:user1) { User.first }
    let!(:user2) { FactoryBot.create(:user) }
    let(:request) { Request.create(sending_user_id: user2.id, receiving_user_id: user1.id) }
    let(:second_request) { Request.create(sending_user_id: user1.id, receiving_user_id: user2.id) }

    context 'when the current user is the receiving user' do
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

      it 'returns a created status' do
        post :accept, params: request_params, as: :json
        expect(response.status).to eq(201)
      end
    end

    context 'when the current user is not the receiving user' do
      it 'does not update the requests status to accepted' do
        expect(request.status).to eq('pending')
        post :accept, params: invalid_request_params, as: :json
        request.reload
        expect(request.status).to eq('pending')
      end

      it 'does not create buddy relationships for both users in the request' do
        post :accept, params: invalid_request_params, as: :json
        expect(user1.buddies.count).to eq(0)
        expect(user2.buddies.count).to eq(0) 
      end

      it 'returns a forbidden status' do
        post :accept, params: invalid_request_params, as: :json
        expect(response.status).to eq(403)
      end
    end
  end

  describe 'POST reject' do
    login_user

    let(:request_params) do
      {
        request: {
          request_id: request.id
        }
      }
    end

    let(:invalid_request_params) do
      {
        request: {
          request_id: second_request.id
        }
      }
    end

    let!(:user1) { User.first }
    let!(:user2) { FactoryBot.create(:user) }

    context 'when the current user is the receiving user' do
      let!(:request) { Request.create(sending_user_id: user2.id, receiving_user_id: user1.id) }

      it 'deletes the associated request' do
        expect(request.status).to eq('pending')
        post :reject, params: request_params, as: :json
        expect { request.reload }.to raise_error(ActiveRecord::RecordNotFound)
        expect(Request.all.count).to eq(0)
      end

      it 'returns an ok status' do
        post :reject, params: request_params, as: :json
        expect(response.status).to eq(200)
      end
    end

    context 'when the current user is not the receiving user' do
      let!(:second_request) { Request.create(sending_user_id: user1.id, receiving_user_id: user2.id) }

      it 'does not delete the associated request' do
        expect(second_request.status).to eq('pending')
        post :reject, params: invalid_request_params, as: :json
        expect(Request.all.count).to eq(1)
      end

      it 'returns a forbidden status' do
        post :reject, params: invalid_request_params, as: :json
        expect(response.status).to eq(403)
      end
    end
  end
end
