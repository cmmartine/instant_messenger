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

  describe 'GET current_user_info' do
    login_user
    it 'returns a 200 success response' do
      get :current_user_info
      expect(response).to be_successful
    end
  end

  describe 'GET set_theme' do
    login_user
    it 'updates the theme from light (default) to dark' do
      get :set_theme
      expect(User.first.theme).to eq('dark')
    end

    it 'updates the theme from dark to light' do
      User.update(User.first.id, theme: 'dark')
      get :set_theme
      expect(User.first.theme).to eq('light')
    end
  end

  describe 'GET current_theme' do
    login_user
    it 'returns light when the current users theme is light (default)' do
      get :current_theme
      data = JSON.parse(response.body)
      expect(data['theme']).to eq('light')
    end

    it 'returns dark when the current users theme is dark' do
      User.update(User.first.id, theme: 'dark')
      get :current_theme
      data = JSON.parse(response.body)
      expect(data['theme']).to eq('dark')
    end
  end

  describe 'POST search' do
    login_user

    before do
      User.create(username: 'Bianca', email: 'bianca1@chatroom.com', password: 'Bianca1!', password_confirmation: 'Bianca1!')
      User.create(username: 'Brittney', email: 'brittney1@chatroom.com', password: 'Brittney1!', password_confirmation: 'Brittney1!')
    end

    search_params_lower_b = {
      user: {
        user_search_input: 'b'
      }
    }

    search_params_upper_a = {
      user: {
        user_search_input: 'A'
      }
    }

    it 'returns json with usernames and ids for all users containing the letter b regardless of case' do
      post :search, params: search_params_lower_b, as: :json
      expect(response.body).to include('Bianca')
      expect(response.body).to include('Brittney')
      expect(response.body).to include('2')
      expect(response.body).to include('3')
    end

    it 'returns json with usernames and ids for all users containing the letter a regardless of case' do
      post :search, params: search_params_upper_a, as: :json
      expect(response.body).to include('Bianca')
      expect(response.body).to include('2')
    end
  end
end
