# frozen_string_literal: true

class ChatroomsController < ApplicationController
  def find_or_create
    found_chatroom = find_chatroom
    if !found_chatroom
      new_room = Chatroom.create!(active_status: chatroom_params[:active_status])
      current_user.chatrooms << new_room
      User.find(chatroom_params[:userId]).chatrooms << new_room
      render json: Chatroom.with_user_ids([new_room]).first
    else
      render json: Chatroom.with_user_ids([found_chatroom]).first
    end
  end

  def messages
    chatroom = Chatroom.find(chatroom_params[:chatroom_id])
    chatrooms_messages = chatroom.messages
    sorted_messages = [sort_messages(chatrooms_messages), { id: chatroom.id }]
    if sorted_messages
      render json: sorted_messages
    else
      render json: nil.to_json
    end
  end

  def user_is_typing
    ChatroomChannel.broadcast_to(Chatroom.find(chatroom_params[:chatroom_id]), { user_is_typing: { status: true, current_user_id: current_user.id } })
  end

  def user_is_not_typing
    ChatroomChannel.broadcast_to(Chatroom.find(chatroom_params[:chatroom_id]), { user_is_typing: { status: false, current_user_id: current_user.id } })
  end

  def deactivate
    chatrooms = current_user.chatrooms.where(active_status: true)
    return if chatrooms.empty?

    chatrooms.each(&:set_to_inactive)
    head :no_content
  end

  private

  def chatroom_params
    params.require(:chatroom).permit(:active_status, :userId, :chatroom_id)
  end

  def find_chatroom
    found_chatroom = false
    chatrooms = current_user.chatrooms
    return found_chatroom if chatrooms.empty?

    chatrooms.each do |room|
      if room.user_ids.include?(current_user.id) && room.user_ids.include?(chatroom_params[:userId])
        found_chatroom = room
        found_chatroom.update!(active_status: true)
      end
    end
    found_chatroom
  end

  def sort_messages(messages)
    messages.sort_by { |msg| msg.created_at }
  end
end
