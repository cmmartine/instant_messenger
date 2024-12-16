# frozen_string_literal: true

class UsersController < ApplicationController
  def buddies
    buddies = current_user.buddies
    filtered_buddies = Buddy.filter_to_usernames_and_ids(buddies)
    render json: filtered_buddies
  end

  def current_user_info
    @current_user_info = {
      username: current_user.username,
      id: current_user.id,
      chatrooms: current_user.chatrooms
    }
    render json: @current_user_info
  end

  def set_theme
    current_user.theme == 'light' ? User.update(current_user.id, theme: 'dark') : User.update(current_user.id, theme: 'light')
    head :no_content
  end

  def current_theme
    render json: { theme: current_user.theme }
  end

  def search
    found_users = User.search(user_params[:user_search_input])
    filtered_users = User.filter_search_to_name_and_id(found_users)

    if found_users
      render json: filtered_users.to_json
    else
      head :no_content
    end
  end

  private

  def user_params
    params.require(:user).permit(:user_search_input)
  end
end
