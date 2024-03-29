class ChatroomsController < ApplicationController
  def find_or_create()

  end


  private

  def find_chatroom(user1, user2)
    found_chatroom = nil

    #todo: find a better way of doing this
    Chatroom.all.each do |chatroom|
      if chatroom.users[0].id == user1.id && chatroom.users[1].id == user2.id
        found_chatroom = chatroom
      elsif chatroom.users[1].id == user1.id && chatroom.users[0].id == user2.id
        found_chatroom = chatroom
      end
    end

    found_chatroom
  end

  def chatroom_params

  end
end
