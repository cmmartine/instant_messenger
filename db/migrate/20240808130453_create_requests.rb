class CreateRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :requests do |t|
      t.references :sending_user, null: false, foreign_key: { to_table: :users }
      t.references :receiving_user, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
