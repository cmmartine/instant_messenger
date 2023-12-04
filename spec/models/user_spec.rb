require 'rails_helper'

RSpec.describe User, type: :model do

  describe 'associations' do
    it { should have_many(:messages) }
    it { should have_and_belong_to_many(:chatrooms) }
  end

  describe 'validations' do
    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_length_of(:username).is_at_least(3).is_at_most(20) }
    it { should allow_value('Password1!').for(:password) }
    it { should_not allow_value('password').for(:password) }
    it { should_not allow_value('Password1').for(:password) }
  end

end