class Player < ApplicationRecord
    has_many :games
    accepts_nested_attributes_for :games
    validates :name, presence: true, uniqueness: true
end
