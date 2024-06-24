require 'rails_helper'

RSpec.describe MessagesController, type: :controller do
  describe 'POST /create' do
    login_user
    create_chatroom

    it 'creates a message' do
      message_params = {
        message: {
          body: 'Test message',
          chatroom_id: 1
        }
      }
      post :create, params: message_params, as: :json
      all_messages = Message.all
      expect(all_messages.length).to eq(1)
    end
  end

  describe 'POST /create_ai_chatroom_messages' do
    login_user
    create_chatroom

    it 'creates a message for both user and a return message from the chatbot' do
      message_params = {
        message: {
          body: 'Test message',
          user_id: 1,
          chatroom_id: 1
        }
      }
      ai_chatbot = User.new(username: 'Chatbot', id: 2)
      ai_chatbot.save(validate: false)

      post :create_ai_chatroom_messages, params: message_params, as: :json
      all_messages = Message.all
      expect(all_messages.length).to eq(2)
      expect(Message.first.user_id).to be(1)
      expect(Message.last.user_id).to be(2)
    end
  end
end
