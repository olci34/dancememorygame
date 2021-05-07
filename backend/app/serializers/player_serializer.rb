class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :rank, :name, :highest_score
  has_many :games
end
