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

  def add_buddy(user1, user2)
    return unless user1 && user2

    Request.create(sending_user_id: user1.id, receiving_user_id: user2.id, status: 'accepted')
    Buddy.create(user_id: user1.id, buddy_id: user2.id)
    Buddy.create(user_id: user2.id, buddy_id: user1.id)
    refresh_page
  end

  def create_received_request(user_to_add)
    user = first_user
    return unless user && user_to_add

    Request.create(sending_user_id: user_to_add.id, receiving_user_id: user.id)
  end

  def login(user)
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

  def click_buddies_tab
    find('[data-testid="buddy-tab"]').click
  end

  def click_requests_tab
    find('[data-testid="requests-tab"]').click
  end

  def open_chatroom(user)
    find('li', text: user.username).click
  end

  def close_chatroom
    find('.chatroom-exit-btn').click
  end

  def send_message(msg)
    within('#chatroom-message-form') do
      fill_in 'message-box-text', with: msg
    end
    click_button 'send-message-btn'
  end

  def type_message(msg)
    within('#chatroom-message-form') do
      fill_in 'message-box-text', with: msg
    end
  end

  def delete_message
    within('#chatroom-message-form') do
      fill_in 'message-box-text', with: ''
    end
  end

  def switch_theme
    find('[data-testid="theme-btn"]').click
  end
end
