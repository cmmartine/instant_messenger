# frozen_string_literal: true

module FeatureHelpers
  def create_users
    FactoryBot.create(:user)
    FactoryBot.create(:user)
    FactoryBot.create(:user)
  end

  def first_user
    User.first
  end

  def second_user
    User.find(2)
  end

  def third_user
    User.find(3)
  end

  def add_buddy(user_to_add)
    user = first_user
    return unless user && user_to_add

    Request.create(sending_user_id: user.id, receiving_user_id: user_to_add.id, status: 'accepted')
    Buddy.create(user_id: user.id, buddy_id: user_to_add.id)
  end

  def login
    user = first_user
    return unless user

    visit '/users/sign_in'
    within('#new_user') do
      fill_in 'Email', with: user.email
      fill_in 'Password', with: 'Password1!'
    end
    click_button 'Log in'
  end

  def refresh_page
    visit '/'
  end

  def searchbar
    find('.user-searchbar')
  end

  def search_for(input)
    within(searchbar) do
      fill_in 'search-input', with: input
    end
    click_button 'search-btn'
  end
end
