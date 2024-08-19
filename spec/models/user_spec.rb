require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should have_many(:messages) }
    it { should have_and_belong_to_many(:chatrooms) }
  end

  describe 'validations' do
    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_length_of(:username).is_at_least(3).is_at_most(20) }
    it { should allow_value('Password1!').for(:password) }
    it { should_not allow_value('password').for(:password) }
    it { should_not allow_value('Password1').for(:password) }
  end

  describe 'self.chatbot_id' do
    it 'returns the correct id for username of Chatbot' do
      ai_chatbot = User.new(username: 'Chatbot', id: 2)
      ai_chatbot.save(validate: false)
      return_id = User.chatbot_id
      expect(return_id).to be(2)
    end
  end

  describe 'self.search' do
    before do
      User.create(username: 'Bianca', email: 'bianca1@chatroom.com', password: 'Bianca1!', password_confirmation: 'Bianca1!')
      User.create(username: 'Brittney', email: 'brittney1@chatroom.com', password: 'Brittney1!', password_confirmation: 'Brittney1!')
    end

    search_params_lower_b = 'b'

    search_params_upper_a = 'A'

    it 'returns all users with the letter B in their name when user input is lowercase and username letter is uppercase' do
      output = User.search(search_params_lower_b)
      expect(output).to include(User.find_by(username: 'Bianca'))
      expect(output).to include(User.find_by(username: 'Brittney'))
    end

    it 'returns all users with the letter A in their name when user input is uppercase and username letter is lowercase' do
      output = User.search(search_params_upper_a)
      expect(output).to include(User.find_by(username: 'Bianca'))
    end
  end

  describe 'self.filter_search_to_name_and_id' do
    before do
      User.create(username: 'Bianca', email: 'bianca1@chatroom.com', password: 'Bianca1!', password_confirmation: 'Bianca1!')
      User.create(username: 'Brittney', email: 'brittney1@chatroom.com', password: 'Brittney1!', password_confirmation: 'Brittney1!')
    end

    expected_result = [
      {
        username: 'Bianca',
        id: 1
      },
      {
        username: 'Brittney',
        id: 2
      }
    ]

    it('filters to just name and id') do
      input = User.where('username LIKE ?', 'B%')
      output = User.filter_search_to_name_and_id(input)
      expect(output).to eq(expected_result)
    end
  end
end
