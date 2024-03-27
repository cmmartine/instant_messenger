# frozen-string-literal: true

Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  get 'users/index'
  get 'users/current_user_info'
  devise_for :users
  root 'main#index'
  get '/*path' => 'main#index'
end
