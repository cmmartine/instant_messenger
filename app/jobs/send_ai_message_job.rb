# frozen_string_literal: true

class SendAiMessageJob < ApplicationJob
  def perform(message, chatroom_id)
    ChatroomChannel.broadcast_to(Chatroom.find(chatroom_id), { user_is_typing: { status: true, current_user_id: User.chatbot_id } })

    ai_response = `python3 app/jobs/h2oai_api.py '#{message[:body]}'`
    no_ai_response_msg = 'Chatbot is currently unavailable, please try again later.'
    finalized_response = ai_response == '' ? no_ai_response_msg : ai_response

    Message.create!(body: finalized_response, user_id: User.chatbot_id, chatroom_id: chatroom_id)
    ChatroomChannel.broadcast_to(Chatroom.find(chatroom_id), { finished_message: finalized_response })
    ChatroomChannel.broadcast_to(Chatroom.find(chatroom_id), { user_is_typing: { status: false, current_user_id: User.chatbot_id } })
  end
end
