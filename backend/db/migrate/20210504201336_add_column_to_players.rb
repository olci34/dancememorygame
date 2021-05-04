class AddColumnToPlayers < ActiveRecord::Migration[6.1]
  def change
    add_column :players, :highest_score, :integer
  end
end
