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
end
