# frozen_string_literal: true
require 'rails_helper'

describe 'The signin process', type: :feature do
  it 'signs the user in' do
    user = FactoryBot.create(:user)
    visit '/users/sign_in'
    within('#new_user') do
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
    end
    click_button 'Log in'
    expect(page).to have_content(user.username)
  end
end
