require 'rails_helper'

RSpec.describe ChatroomsController, type: :controller do
  describe 'POST find_or_create' do
    describe 'without a chatroom between current user and selected user' do
      login_user
      create_second_user

      it 'creates a new chatroom' do
        chatroom_params = { chatroom: {
          active_status: true,
          userId: 2
        } }

        post :find_or_create, params: chatroom_params, as: :json
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

        post :find_or_create, params: chatroom_params, as: :json
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

      it 'orders those messages upon return so the oldest created_at is first in the array' do
        chatroom_params = { chatroom: {
          chatroom_id: 1
        } }
        today = DateTime.current
        yesterday = DateTime.current - 1
        Chatroom.create(active_status: true)
        Message.create({ body: 'Message from today', user_id: 1, chatroom_id: 1, created_at: today })
        Message.create({ body: 'Message from yesterday', user_id: 1, chatroom_id: 1, created_at: yesterday })
        # Messages in chatroom before being sorted
        expect(Chatroom.find(1).messages[0].body).to include('Message from today')

        post :messages, params: chatroom_params, as: :json
        # Messages in response after being sorted
        expect(JSON.parse(response.body)[0][0]['body']).to include('Message from yesterday')
      end
    end
  end
end
