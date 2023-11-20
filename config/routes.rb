Rails.application.routes.draw do
  get 'users/index'
  devise_for :users
  root 'main#index'
  get "/*path" => "main#index"
end
