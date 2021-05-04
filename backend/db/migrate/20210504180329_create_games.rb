class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.integer :cardNumber
      t.integer :clickNumber, default: 0
      t.integer :score
      t.integer :player_id
    end
  end
end
