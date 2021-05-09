class PlayersController < ApplicationController

    def index
        players = Player.all
        render json: players
    end

    def create
        newPlayer = Player.new(player_params)
        if newPlayer.save
            render json: newPlayer
        else
            render json: {message: newPlayer.errors.full_messages}
        end
    end

    def show
        player = Player.find_by(id: params[:id])
        render json: player
    end
    
    private

    def player_params
        params.require(:player).permit(:name, games_attributes: [:card_number])
    end
end
