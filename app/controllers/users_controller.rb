class UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def get_current_user
    @current_user = current_user
    render json: @current_user
  end
end
