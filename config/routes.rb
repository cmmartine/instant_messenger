Rails.application.routes.draw do
  get 'users/index'
  get 'users/current_user_name'
  devise_for :users
  root 'main#index'
  get "/*path" => "main#index"
end
