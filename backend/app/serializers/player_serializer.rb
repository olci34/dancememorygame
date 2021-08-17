class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :rank, :name, :latest_score
  has_many :games

  def latest_score
    Player.latest_score(self.object)
  end

  def rank
    self.object.find_rank
  end
end
