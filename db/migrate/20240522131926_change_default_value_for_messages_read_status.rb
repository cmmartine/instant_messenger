class ChangeDefaultValueForMessagesReadStatus < ActiveRecord::Migration[7.0]
  def change
    change_column_default(:messages, :read_status, false)
  end
end
