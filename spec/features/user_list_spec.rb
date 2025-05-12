# frozen_string_literal: true

require 'rails_helper'

describe 'User List Sidebar', type: :feature, js: true do
  include FeatureHelpers

  describe 'Clicking a username in the buddy list' do
    before do
      create_users
      login(first_user)
    end

    it 'opens a chatroom with the selected user' do
      add_buddy(first_user, second_user)
      refresh_page
      find('li', text: second_user.username).click
      expect(page).to have_css('.chatroom-container')
    end
  end

  describe 'Accepting a request' do
    before do
      create_users
      login(first_user)
    end

    def accept_request
      create_received_request(second_user)
      click_requests_tab
      expect(page).to have_content(second_user.username)
      click_button 'Accept'
    end

    it 'does not show requesting user in request list after accept button is clicked' do
      accept_request
      expect(page).not_to have_content(second_user.username)
      expect(page).not_to have_button('Accept')
      expect(page).not_to have_button('Reject')
    end

    it 'shows the accepted requests user in buddy list' do
      accept_request
      click_buddies_tab
      expect(page).to have_content(second_user.username)
    end
  end

  describe 'Reject a request' do
    before do
      create_users
      login(first_user)
    end

    def reject_request
      create_received_request(second_user)
      click_requests_tab
      expect(page).to have_content(second_user.username)
      click_button 'Reject'
    end

    it 'does not show requesting user in request list after reject button is clicked' do
      reject_request
      expect(page).not_to have_content(second_user.username)
      expect(page).not_to have_button('Accept')
      expect(page).not_to have_button('Reject')
    end

    it 'does not show the rejected requests user in buddy list' do
      reject_request
      click_buddies_tab
      expect(page).not_to have_content(second_user.username)
    end
  end
end
