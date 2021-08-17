class Player < ApplicationRecord
    has_many :games
    accepts_nested_attributes_for :games
    validates :name, presence: true, uniqueness: true
    scope :latest_score, ->(player) { Game.where('player_id = ?', player.id).last.score }
    
    def find_rank
       Player.all.sort_by {|p| Player.latest_score(p)}.reverse.index(self) + 1
    end 
end
