# frozen_string_literal: true

require 'rails_helper'

describe 'Searching for a user', type: :feature, js: true do
  include FeatureHelpers

  before do
    create_users
    login
  end

  it 'shows list of possible matches' do
    search_for('t')
    expect(page).to have_content(second_user.username)
    expect(page).to have_content(third_user.username)
  end

  it 'allows user to send a request to users that are not yet their buddy' do
    search_for(second_user.username)
    click_button 'Add Buddy'
    search_for(second_user.username)
    expect(page).to have_button('Pending', disabled: true)
  end

  it 'does not show a request button when the searched for user is already a buddy' do
    search_for(third_user.username)
    expect(page).to have_button('Add Buddy')
    add_buddy(third_user)
    search_for(third_user.username)
    expect(page).not_to have_button('Add Buddy')
    expect(page).not_to have_button('Pending')
  end

  it 'closes the list when user clicks outside of result box' do
    search_for('t')
    expect(page).to have_content(second_user.username)
    expect(page).to have_content(third_user.username)
    find_by_id('root').click
    expect(page).not_to have_content(second_user.username)
    expect(page).not_to have_content(third_user.username)
  end
end
