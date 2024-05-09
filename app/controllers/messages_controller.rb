# frozen_string_literal: true

class MessagesController < ApplicationController
  def create
    Message.create!(body: message_params[:body], user_id: current_user.id, chatroom_id: message_params[:chatroom_id])
  end

  private

  def message_params
    params.require(:message).permit(:body, :chatroom_id)
  end
end
