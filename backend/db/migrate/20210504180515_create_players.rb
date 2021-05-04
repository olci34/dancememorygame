class CreatePlayers < ActiveRecord::Migration[6.1]
  def change
    create_table :players do |t|
      t.integer :rank, default: 0 
      t.string :name
    end
  end
end
