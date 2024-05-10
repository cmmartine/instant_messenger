# frozen_string_literal: true

class MessagesController < ApplicationController
  def create
    message = Message.create!(body: message_params[:body], user_id: current_user.id, chatroom_id: message_params[:chatroom_id])
    if message.valid?
      ChatroomChannel.broadcast_to(Chatroom.find(message_params[:chatroom_id]), message.body)
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :chatroom_id)
  end
end
