class ChatroomsController < ApplicationController
  def create
    return if find_chatroom

    new_room = Chatroom.create!(active_status: chatroom_params[:active_status])
    current_user.chatrooms << new_room
    User.find(chatroom_params[:userId]).chatrooms << new_room
  end

  private

  def chatroom_params
    params.require(:chatroom).permit(:active_status, :userId)
  end

  def find_chatroom
    found_status = false
    chatrooms = Chatroom.all
    return found_status if chatrooms.empty?

    chatrooms.each do |room|
      if room.user_ids.include?(current_user.id) && room.user_ids.include?(chatroom_params[:userId])
        found_status = true
      end
    end
    found_status
  end
end
