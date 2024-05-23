# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chatroom

  def update_read_status
    if read_status == false
      update(read_status: true)
    end
  end
end
