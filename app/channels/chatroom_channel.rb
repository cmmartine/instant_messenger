# frozen_string_literal: true

class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    @room = Chatroom.find(params[:room])
    stream_for @room
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
