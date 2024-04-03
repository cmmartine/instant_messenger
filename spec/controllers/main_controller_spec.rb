require 'rails_helper'

RSpec.describe MainController, type: :controller do

  describe 'GET index' do

    describe 'with user logged in' do
      login_user
      it 'returns a 200 successful response' do
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
end