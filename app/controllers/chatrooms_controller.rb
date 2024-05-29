# frozen_string_literal: true

class ChatroomsController < ApplicationController
  def find_or_create
    found_chatroom = find_chatroom
    if !found_chatroom
      new_room = Chatroom.create!(active_status: chatroom_params[:active_status])
      current_user.chatrooms << new_room
      User.find(chatroom_params[:userId]).chatrooms << new_room
      render json: new_room
    else
      render json: found_chatroom
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

  private

  def chatroom_params
    params.require(:chatroom).permit(:active_status, :userId, :chatroom_id)
  end

  def find_chatroom
    found_chatroom = false
    chatrooms = Chatroom.all
    return found_chatroom if chatrooms.empty?

    chatrooms.each do |room|
      if room.user_ids.include?(current_user.id) && room.user_ids.include?(chatroom_params[:userId])
        found_chatroom = room
      end
    end
    found_chatroom
  end

  def sort_messages(messages)
    messages.sort_by { |msg| msg.created_at }
  end
end
