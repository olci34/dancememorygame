class CreatePlayers < ActiveRecord::Migration[6.1]
  def change
    create_table :players do |t|
      t.integer :rank, default: 0 
      t.string :name
      t.integer :highest_score, default: 0
    end
  end
end
