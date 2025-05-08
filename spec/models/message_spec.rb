require 'rails_helper'

RSpec.describe Message, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:chatroom) }
  end

  describe '#update_read_status' do
    it 'changes read_status to true when it was false' do
      msg = Message.create(body: 'Test', read_status: false, user_id: 1, chatroom_id: 1)
      msg.update_read_status
      expect(msg.read_status).to be(true)
    end

    it 'does not change when read_status is already true' do
      msg = Message.create(body: 'Test', read_status: true, user_id: 1, chatroom_id: 1)
      msg.update_read_status
      expect(msg.read_status).to be(true)
    end
  end
end
