# frozen-string-literal: true

Rails.application.routes.draw do
  post 'messages/create'
  post 'messages/create_ai_chatroom_messages'
  post 'messages/most_recent_message_read_status'
  post 'messages/update_chatroom_messages_read_status'
  post 'chatrooms/find_or_create'
  post 'chatrooms/messages'
  post 'chatrooms/user_is_typing'
  post 'chatrooms/user_is_not_typing'
  mount ActionCable.server => '/cable'
  get 'users/index'
  get 'users/current_user_info'
  get 'users/current_users_chatrooms'
  get 'users/set_theme'
  get 'users/current_theme'
  devise_for :users
  root 'main#index'
  get '/*path' => 'main#index'
end
