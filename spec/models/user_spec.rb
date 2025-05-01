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

  describe 'add_chatbot_buddy' do
    it 'adds chatbot to a newly created users buddy list' do
      ai_chatbot = User.new(username: 'Chatbot')
      ai_chatbot.save(validate: false)
      user = User.create(username: 'Bianca', email: 'bianca1@chatroom.com', password: 'Bianca1!', password_confirmation: 'Bianca1!')
      expect(user.buddies.first.buddy_id).to eq(ai_chatbot.id)
    end
  end

  describe 'self.search' do
    before do
      User.create(username: 'Bianca', email: 'bianca1@chatroom.com', password: 'Bianca1!', password_confirmation: 'Bianca1!')
      User.create(username: 'Brittney', email: 'brittney1@chatroom.com', password: 'Brittney1!', password_confirmation: 'Brittney1!')
    end

    search_params_lower_b = 'b'

    search_params_upper_a = 'A'

    search_params_unfound = 'z'

    it 'returns all users with the letter B in their name when user input is lowercase and username letter is uppercase' do
      output = User.search(search_params_lower_b)
      expect(output).to include(User.find_by(username: 'Bianca'))
      expect(output).to include(User.find_by(username: 'Brittney'))
    end

    it 'returns all users with the letter A in their name when user input is uppercase and username letter is lowercase' do
      output = User.search(search_params_upper_a)
      expect(output).to include(User.find_by(username: 'Bianca'))
    end

    it 'returns an empty array when there is no match' do
      output = User.search(search_params_unfound)
      expect(output).to eq([])
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

    expected_result_empty = []

    it('filters to just name and id when passed an array of users') do
      input = User.where('username LIKE ?', 'B%')
      output = User.filter_search_to_name_and_id(input)
      expect(output).to eq(expected_result)
    end

    it('returns an empty array when no users are in the passed in array') do
      input = User.where('username LIKE ?', 'z%')
      output = User.filter_search_to_name_and_id(input)
      expect(output).to eq(expected_result_empty)
    end
  end
end
