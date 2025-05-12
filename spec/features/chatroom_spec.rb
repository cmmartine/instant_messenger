# frozen_string_literal: true

require 'rails_helper'

describe 'Chatroom', type: :feature, js: true do
  include FeatureHelpers

  context 'sending a message, only one browser' do
    before do
      create_users
      login(first_user)
      add_buddy(first_user, second_user)
      open_chatroom(second_user)
    end

    it 'shows messages sent to the other user' do
      message1 = 'Hello there'
      message2 = "What's up"
      send_message(message1)
      send_message(message2)
      expect(page).to have_content(message1)
      expect(page).to have_content(message2)
    end

    it 'shows messages sent in the correct order, newest at the bottom' do
      message1 = 'Hello there'
      message2 = "What's up"
      send_message(message1)
      send_message(message2)
      expect(page).to have_content(message1)
      expect(page).to have_content(message2)
      messages = find_all('[class="message-body"]').collect(&:text)
      expect(messages[0]).to eq(message2)
      expect(messages[1]).to eq(message1)
    end

    context 'when a chatroom is open and the user switches the theme and then sends a message' do
      it 'shows the message' do
        message1 = 'Hello there'
        switch_theme
        send_message(message1)
        expect(page).to have_content(message1)
      end
    end
  end

  context 'sending a message, two browsers' do
    let(:message1) { 'Hello there' }
    let(:message2) { "What's up" }
    let(:message3) { 'Just chilling dude, hbu' }

    before do
      create_users
      add_buddy(first_user, second_user)
    end

    it 'shows messages sent between users' do
      Capybara.using_session('user1') do
        login(first_user)
        open_chatroom(second_user)
      end

      Capybara.using_session('user2') do
        login(second_user)
        open_chatroom(first_user)
      end

      Capybara.using_session('user1') do
        send_message(message1)
        send_message(message2)
        expect(page).to have_content(message1)
        expect(page).to have_content(message2)
      end

      Capybara.using_session('user2') do
        send_message(message3)
        expect(page).to have_content(message1)
        expect(page).to have_content(message2)
        expect(page).to have_content(message3)
      end

      Capybara.using_session('user1') do
        expect(page).to have_content(message3)
      end
    end
  end
end
