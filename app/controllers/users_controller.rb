# frozen_string_literal: true

class UsersController < ApplicationController
  THEMES = Constants::THEMES

  def buddies
    buddies = current_user.buddies
    filtered_buddies = Buddy.filter_to_usernames_and_ids(buddies)
    render json: filtered_buddies
  end

  def current_user_info
    users_active_chatrooms = current_user.chatrooms.where('active_status = ?', true)
    @current_user_info = {
      username: current_user.username,
      id: current_user.id,
      chatrooms: Chatroom.with_user_ids(users_active_chatrooms)
    }
    render json: @current_user_info
  end

  def set_theme
    current_user.theme == 'light' ? User.update(current_user.id, theme: THEMES['dark']) : User.update(current_user.id, theme: THEMES['light'])
    head :no_content
  end

  def current_theme
    render json: { theme: current_user.theme }
  end

  def search
    found_users = User.search(user_params[:user_search_input])

    render json: found_users.to_json
  end

  private

  def user_params
    params.require(:user).permit(:user_search_input)
  end
end
