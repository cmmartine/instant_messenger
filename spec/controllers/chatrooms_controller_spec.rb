require 'rails_helper'

RSpec.describe ChatroomsController, type: :controller do

  describe 'POST create' do

    # describe 'without a chatroom between current user and selected user' do

    # end

    describe 'with a chatroom between current user and selected user' do
      login_user

      it 'does not create a new chatroom' do
        other_user = User.create(username: 'Bianca', email: 'bianca1@chatroom.com', password: 'Bianca1!', password_confirmation: 'Bianca1!')
        chatroom_params = { chatroom: {
          active_status: true,
          userId: other_user.id
        } }
        test_chatroom = Chatroom.create(active_status: true)
        subject.current_user.chatrooms << test_chatroom
        other_user.chatrooms << test_chatroom

        post :create, params: chatroom_params, as: :json
        all_chatrooms = Chatroom.all

        expect(all_chatrooms.length).to eq(1)
      end
    end
  end
end
