class PlayersController < ApplicationController

    def index
        players = Player.all
        render json: players
    end

    def create
        newPlayer = Player.create(player_params)
        render json: newPlayer
    end
    
    private

    def player_params
        params.require(:player).permit(:name)
    end
end
