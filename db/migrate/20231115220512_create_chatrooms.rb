class CreateChatrooms < ActiveRecord::Migration[7.0]
  def change
    create_table :chatrooms do |t|
      t.boolean :active_status

      t.timestamps
    end
  end
end
