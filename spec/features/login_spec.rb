# frozen_string_literal: true

require 'rails_helper'

describe 'The signin process', type: :feature do
  describe 'when the user enters valid credentials' do
    it 'signs the user in' do
      user = FactoryBot.create(:user)
      visit '/users/sign_in'
      within('#new_user') do
        fill_in 'Email', with: user.email
        fill_in 'Password', with: 'Password1!'
      end
      click_button 'Log in'
      expect(page).to have_content(user.username)
    end
  end

  describe 'when the user DOES NOT enter valid credentials' do
    it 'DOES NOT sign the user in' do
      visit '/users/sign_in'
      within('#new_user') do
        fill_in 'Email', with: 'wrong_email@email.com'
        fill_in 'Password', with: 'wrong_password1!'
      end
      click_button 'Log in'
      expect(page).to have_content('Invalid Email or password.')
    end
  end
end
