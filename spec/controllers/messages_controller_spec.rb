require 'rails_helper'

RSpec.describe MessagesController, type: :controller do
  login_user
  create_chatroom

  let(:message_params) do
    {
      message: {
        body: 'Test message',
        chatroom_id: Chatroom.first.id
      }
    }
  end

  describe 'POST /create' do
    context 'when the user is in the chatroom' do
      it 'creates a message' do
        User.first.chatrooms << Chatroom.first
        post :create, params: message_params, as: :json
        all_messages = Message.all
        expect(all_messages.length).to eq(1)
      end

      it 'returns a created status' do
        User.first.chatrooms << Chatroom.first
        post :create, params: message_params, as: :json
        expect(response.status).to eq(201)
      end
    end

    context 'when the user is not in the chatroom' do
      it 'does not create a message' do
        post :create, params: message_params, as: :json
        all_messages = Message.all
        expect(all_messages.length).to eq(0)
      end

      it 'returns a forbidden status' do
        post :create, params: message_params, as: :json
        expect(response.status).to eq(403)
      end
    end
  end

  describe 'POST /create_ai_chatroom_messages' do
    context 'when the user is in the chatroom' do
      it 'creates a message for the user and calls the SendAiMessageJob' do
        User.first.chatrooms << Chatroom.first
        ai_chatbot = User.new(username: 'Chatbot', id: 3)
        ai_chatbot.save(validate: false)

        allow(SendAiMessageJob).to receive(:perform_later).and_return('Finished')
        expect(SendAiMessageJob).to receive(:perform_later)

        post :create_ai_chatroom_messages, params: message_params, as: :json
        all_messages = Message.all

        expect(all_messages.length).to eq(1)
        expect(Message.first.user_id).to be(1)
      end

      it 'returns a created status' do
        User.first.chatrooms << Chatroom.first
        post :create_ai_chatroom_messages, params: message_params, as: :json
        expect(response.status).to eq(201)
      end
    end

    context 'when the user is not in the chatroom' do
      it 'does not create a message' do
        post :create_ai_chatroom_messages, params: message_params, as: :json
        all_messages = Message.all
        expect(all_messages.length).to eq(0)
      end

      it 'returns a forbidden status' do
        post :create_ai_chatroom_messages, params: message_params, as: :json
        expect(response.status).to eq(403)
      end
    end
  end
end
