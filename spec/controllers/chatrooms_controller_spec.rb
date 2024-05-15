require 'rails_helper'

RSpec.describe ChatroomsController, type: :controller do
  describe 'POST create' do
    describe 'without a chatroom between current user and selected user' do
      login_user
      create_second_user

      it 'creates a new chatroom' do
        chatroom_params = { chatroom: {
          active_status: true,
          userId: 2
        } }

        post :create, params: chatroom_params, as: :json
        all_chatrooms = Chatroom.all

        expect(all_chatrooms.length).to eq(1)
      end
    end

    describe 'with a chatroom between current user and selected user' do
      login_user
      create_second_user

      it 'does not create a new chatroom' do
        chatroom_params = { chatroom: {
          active_status: true,
          userId: 2
        } }
        test_chatroom = Chatroom.create(active_status: true)
        subject.current_user.chatrooms << test_chatroom
        User.find(2).chatrooms << test_chatroom

        post :create, params: chatroom_params, as: :json
        all_chatrooms = Chatroom.all

        expect(all_chatrooms.length).to eq(1)
      end
    end
  end

  describe 'POST messages' do
    describe 'when a chatroom has messages' do
      login_user

      it 'returns those messages' do
        chatroom_params = { chatroom: {
          chatroom_id: 1
        } }
        Chatroom.create(active_status: true)
        Message.create({ body: 'testing post messages', user_id: 1, chatroom_id: 1 })
        post :messages, params: chatroom_params, as: :json

        expect(response.body).to include('testing post messages')
      end
    end
  end
end
