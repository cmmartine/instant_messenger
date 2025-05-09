require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'GET buddies' do
    describe 'with user logged in' do
      login_user
      it 'returns a 200 success response' do
        get :buddies
        expect(response).to be_successful
      end

      it 'returns the users buddies' do
        current_user = User.first
        buddy_user = FactoryBot.create(:user)
        Buddy.create(user_id: current_user.id, buddy_id: buddy_user.id)
        get :buddies
        buddies_array = JSON.parse(response.body)
        expect(buddies_array[0]['id']).to eq(buddy_user.id)
        expect(buddies_array[0]['username']).to eq(buddy_user.username)
      end

      it 'returns a blank array when the user has no buddies' do
        get :buddies
        buddies_array = JSON.parse(response.body)
        expect(buddies_array).to eq([])
      end
    end

    describe 'with user NOT logged in' do
      it 'does not return successfully' do
        get :buddies
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

    it 'returns the current users username, id, and active chatrooms with user ids' do
      chatroom = FactoryBot.create(:chatroom)
      FactoryBot.create(:chatroom, active_status: false)
      current_user = subject.current_user
      user2 = FactoryBot.create(:user)
      chatroom.users << current_user
      chatroom.users << user2
      get :current_user_info

      data = JSON.parse(response.body)
      expect(data['username']).to eq(current_user.username)
      expect(data['id']).to eq(current_user.id)
      expect(data['chatrooms'].length).to eq(1)
      expect(data['chatrooms'].first['user_ids'].include?(current_user.id)).to eq(true)
      expect(data['chatrooms'].first['user_ids'].include?(user2.id)).to eq(true)
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

    def search_params(input)
      {
        user: {
          user_search_input: input
        }
      }
    end

    it 'returns json with usernames and ids for all users containing the letter b regardless of case' do
      post :search, params: search_params('b'), as: :json
      expect(response.body).to include('Bianca')
      expect(response.body).to include('Brittney')
      expect(response.body).to include('2')
      expect(response.body).to include('3')
    end

    it 'returns json with usernames and ids for all users containing the letter a regardless of case' do
      post :search, params: search_params('A'), as: :json
      expect(response.body).to include('Bianca')
      expect(response.body).to include('2')
    end

    it 'returns an empty array when no users are found' do
      post :search, params: search_params('z'), as: :json
      expect(response.body).to eq('[]')
    end
  end
end
