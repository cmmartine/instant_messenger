class AddStatusToRequests < ActiveRecord::Migration[7.0]
  def change
    add_column :requests, :status, :string
    change_column_default(:requests, :status, 'pending')
  end
end
