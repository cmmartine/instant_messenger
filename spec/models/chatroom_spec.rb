require 'rails_helper'

RSpec.describe Chatroom, type: :model do
  describe 'associations' do
    it { should have_many(:messages) }
    it { should have_and_belong_to_many(:users) }
  end

  describe '#most_recent_non_current_user_message_status' do
    let!(:chatroom) { Chatroom.create }
    let!(:current_user) { FactoryBot.create(:user) }
    let!(:non_current_user) { FactoryBot.create(:user) }

    it 'returns true when there are no non_current_user messages' do
      current_user.chatrooms << chatroom
      non_current_user.chatrooms << chatroom
      expect(chatroom.most_recent_non_current_user_message_status(current_user.id)).to be(true)
    end

    it 'returns false when there are is an unread non_current_user message' do
      current_user.chatrooms << chatroom
      non_current_user.chatrooms << chatroom
      Message.create(body: 'Hello', read_status: false, user_id: non_current_user.id, chatroom_id: chatroom.id)
      expect(chatroom.most_recent_non_current_user_message_status(current_user.id)).to be(false)
    end
  end

  describe '#set_to_inactive' do
    let(:chatroom) { Chatroom.create(active_status: true) }
    let(:current_user) { FactoryBot.create(:user) }

    before(:each) do
      current_user.chatrooms << chatroom
    end

    it 'sets the chatroom to inactive if there are no messages' do
      chatroom.set_to_inactive
      expect(chatroom.active_status).to be(false)
    end

    it 'does not set the chatroom to inactive if there are recent messages' do
      Message.create(body: 'Hello', user_id: current_user.id, chatroom_id: chatroom.id)
      chatroom.set_to_inactive
      expect(chatroom.active_status).to be(true)
    end

    it 'does not set the chatroom to inactive if the latest message is less than a week old' do
      Message.create(body: 'Hello', user_id: current_user.id, chatroom_id: chatroom.id)
      chatroom.set_to_inactive
      expect(chatroom.active_status).to be(true)
    end

    it 'sets the chatroom to inactive if the latest message is older than a week' do
      Message.create(body: 'Hello', user_id: current_user.id, chatroom_id: chatroom.id, created_at: 2.weeks.ago)
      chatroom.set_to_inactive
      expect(chatroom.active_status).to be(false)
    end
  end
end
