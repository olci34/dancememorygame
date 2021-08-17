class Game < ApplicationRecord
    belongs_to :player
    validates :card_number, presence: true
end
