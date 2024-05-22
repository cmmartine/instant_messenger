# frozen-string-literal: true

Rails.application.routes.draw do
  post 'messages/create'
  post 'messages/most_recent_message_read_status'
  post 'chatrooms/create'
  post 'chatrooms/messages'
  post 'chatrooms/match_chatroom'
  mount ActionCable.server => '/cable'
  get 'users/index'
  get 'users/current_user_info'
  get 'users/current_users_chatrooms'
  devise_for :users
  root 'main#index'
  get '/*path' => 'main#index'
end
