class PlayersController < ApplicationController

    def index
        players = Player.all
        render json: players.to_json
    end
    
end
