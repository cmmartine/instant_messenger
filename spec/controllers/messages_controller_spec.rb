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
end
