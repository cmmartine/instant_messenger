# frozen_string_literal: true

require 'rails_helper'

describe 'Chatroom', type: :feature, js: true do
  include FeatureHelpers

  context 'sending a message' do
    before do
      create_users
      login
      add_buddy(second_user)
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
  end
end
