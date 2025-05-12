# frozen_string_literal: true

require 'rails_helper'

describe 'Message Notification', type: :feature, js: true do
  include FeatureHelpers

  let(:new_message_text) { 'New Message!' }

  context 'user1 is typing a message to user2, user2 does not have the chatroom open' do
    before do
      create_users
      add_buddy(first_user, second_user)
    end

    it 'shows a message in progress notification, and does not show New Message text' do
      Capybara.using_session('user1') do
        login(first_user)
        open_chatroom(second_user)
      end

      Capybara.using_session('user2') do
        login(second_user)
      end

      Capybara.using_session('user1') do
        type_message('Hey')
      end

      Capybara.using_session('user2') do
        message_in_progress_element = find('.loader')
        expect(message_in_progress_element).to be_visible
        expect(page).not_to have_content(new_message_text)
      end
    end

    it 'removes the message in progress notification when user1 deletes the text before sending' do
      Capybara.using_session('user1') do
        login(first_user)
        open_chatroom(second_user)
      end

      Capybara.using_session('user2') do
        login(second_user)
      end

      Capybara.using_session('user1') do
        type_message('Hey')
      end

      Capybara.using_session('user2') do
        message_in_progress_element = find('.loader')
        expect(page).to have_css('.loader')
        expect(message_in_progress_element).to be_visible
        expect(page).not_to have_content(new_message_text)
      end

      Capybara.using_session('user1') do
        delete_message
      end

      Capybara.using_session('user2') do
        expect(page).not_to have_css('.loader')
        expect(page).not_to have_content(new_message_text)
      end
    end

    it 'does not show a message in progress for user1' do
      Capybara.using_session('user1') do
        login(first_user)
        open_chatroom(second_user)
      end

      Capybara.using_session('user2') do
        login(second_user)
      end

      Capybara.using_session('user1') do
        type_message('Hey')
        expect(page).not_to have_css('.loader')
        expect(page).not_to have_content(new_message_text)
      end
    end
  end

  context 'user1 sends a message to user2, user2 does not have the chatroom open' do
    before do
      create_users
      add_buddy(first_user, second_user)
    end

    it 'shows a new message notification' do
      Capybara.using_session('user1') do
        login(first_user)
        open_chatroom(second_user)
      end

      Capybara.using_session('user2') do
        login(second_user)
      end

      Capybara.using_session('user1') do
        send_message('Hey')
      end

      Capybara.using_session('user2') do
        expect(page).not_to have_css('.loader')
        expect(page).to have_content(new_message_text)
      end
    end

    it 'does not show a new message notification for user1' do
      Capybara.using_session('user1') do
        login(first_user)
        open_chatroom(second_user)
      end

      Capybara.using_session('user2') do
        login(second_user)
      end

      Capybara.using_session('user1') do
        send_message('Hey')
        expect(page).not_to have_css('.loader')
        expect(page).not_to have_content(new_message_text)
      end
    end
  end

  context 'user1 sends a message to user2, user2 has the chatroom open' do
    before do
      create_users
      add_buddy(first_user, second_user)
    end

    it 'shows a new message notification' do
      Capybara.using_session('user1') do
        login(first_user)
        open_chatroom(second_user)
      end

      Capybara.using_session('user2') do
        login(second_user)
        open_chatroom(first_user)
      end

      Capybara.using_session('user1') do
        send_message('Hey')
      end

      Capybara.using_session('user2') do
        expect(page).not_to have_css('.loader')
        expect(page).not_to have_content(new_message_text)
      end
    end
  end

  context 'user1 sends a message to user2, user2 has the chatroom open, then closes it' do
    before do
      create_users
      add_buddy(first_user, second_user)
    end

    it 'does not show a new message notification after the chatroom is closed' do
      Capybara.using_session('user1') do
        login(first_user)
        open_chatroom(second_user)
      end

      Capybara.using_session('user2') do
        login(second_user)
        open_chatroom(first_user)
      end

      Capybara.using_session('user1') do
        send_message('Hey')
      end

      Capybara.using_session('user2') do
        close_chatroom
        expect(page).not_to have_css('.loader')
        expect(page).not_to have_content(new_message_text)
      end
    end
  end
end
