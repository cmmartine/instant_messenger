class UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def current_user_name
    @current_user_name = {
      username: current_user.username
    }
    render json: @current_user_name
  end
end
