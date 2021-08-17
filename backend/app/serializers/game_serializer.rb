class GameSerializer < ActiveModel::Serializer
  attributes :id, :card_number, :click_number, :score
  belongs_to :player
end
