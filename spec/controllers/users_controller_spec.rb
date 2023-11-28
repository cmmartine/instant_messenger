require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe 'GET index' do

    describe 'with user logged in' do
      login_user
      it 'returns a 200 success response' do
        get :index
        expect(response).to be_successful
      end
    end

    describe 'with user NOT logged in' do
      it 'does not return successfully' do
        get :index
        expect(response).to_not be_successful
      end
    end
  end

  describe 'GET get_current_user' do
    login_user
    it 'returns a 200 success response' do
      get :get_current_user
      expect(response).to be_successful
    end
  end
end