Rails.application.routes.draw do
  devise_for :users
  root 'main#index'
  get "/*path" => "main#index"
end
