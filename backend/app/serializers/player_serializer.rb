class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :rank, :name, :latest_score
  has_many :games
end
