class AddThemeToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :theme, :string
    change_column_default(:users, :theme, 'light')
  end
end
