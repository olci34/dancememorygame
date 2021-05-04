class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.integer :cardNumber
      t.integer :player_id
    end
  end
end
