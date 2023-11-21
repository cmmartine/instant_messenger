Rails.application.routes.draw do
  get 'users/index'
  get 'users/get_current_user'
  devise_for :users
  root 'main#index'
  get "/*path" => "main#index"
end
