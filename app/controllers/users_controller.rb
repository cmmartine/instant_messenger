class UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def current_user_info
    @current_user_info = {
      username: current_user.username,
      id: current_user.id
    }
    render json: @current_user_info
  end
end
