class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.integer :card_number
      t.integer :click_number, default: 0
      t.integer :score, default: 0
      t.integer :player_id
    end
  end
end
