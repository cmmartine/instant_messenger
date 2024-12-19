# frozen_string_literal: true

require 'rails_helper'

describe 'Searching for a user', type: :feature, js: true do
  include FeatureHelpers

  it 'shows list of possible matches' do
    create_users
    login
    search_for('t')
    expect(page).to have_content(second_user.username)
    expect(page).to have_content(third_user.username)
  end

  # it 'allows user to send a request to users that are not yet their buddy' do

  # end

  # it 'closes when user clicks outside of result box' do

  # end
end
