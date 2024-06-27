# frozen_string_literal: true

class MessagesController < ApplicationController
  def create
    message = Message.create!(body: message_params[:body], user_id: current_user.id, chatroom_id: message_params[:chatroom_id])
    if message.valid?
      ChatroomChannel.broadcast_to(Chatroom.find(message_params[:chatroom_id]), { finished_message: message.body })
    end
  end

  def create_ai_chatroom_messages
    message = Message.create!(body: message_params[:body], user_id: current_user.id, chatroom_id: message_params[:chatroom_id])
    if message.valid?
      ChatroomChannel.broadcast_to(Chatroom.find(message_params[:chatroom_id]), { finished_message: message.body })
      # current_user_id must be set to the ai not current user here
      ChatroomChannel.broadcast_to(Chatroom.find(message_params[:chatroom_id]), { user_is_typing: { status: true, current_user_id: User.chatbot_id } })
      chatbot_response = SendAiMessageJob.perform_now(message)
      Message.create!(body: chatbot_response, user_id: User.chatbot_id, chatroom_id: message_params[:chatroom_id])
      ChatroomChannel.broadcast_to(Chatroom.find(message_params[:chatroom_id]), { finished_message: chatbot_response })
      ChatroomChannel.broadcast_to(Chatroom.find(message_params[:chatroom_id]), { user_is_typing: { status: false, current_user_id: User.chatbot_id } })
    end
  end

  def most_recent_message_read_status
    chatroom = Chatroom.find(message_params[:chatroom_id])
    message_read_status = chatroom.most_recent_non_current_user_message_status(current_user.id)
    render json: { read_status: message_read_status }
  end

  def update_chatroom_messages_read_status
    chatroom = Chatroom.find(message_params[:chatroom_id])
    non_current_user_messages = chatroom.messages.where('user_id != ?', current_user.id)
    non_current_user_messages.map { |msg| msg.update_read_status }
  end

  private

  def message_params
    params.require(:message).permit(:body, :chatroom_id)
  end
end
