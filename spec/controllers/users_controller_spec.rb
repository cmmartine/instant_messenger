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
end
