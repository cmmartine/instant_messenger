require 'rails_helper'

RSpec.describe Chatroom, type: :model do
  describe "associations" do
    it { should have_many(:messages) }
    it { should have_and_belong_to_many(:users) }
  end
end