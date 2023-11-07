Rails.application.routes.draw do
  root 'main#index'
  get "/*path" => "main#index"
end
