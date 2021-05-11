class GamesController < ApplicationController

    def index
        games = Game.all
        render json: games
    end

    def create
        game = Game.new(game_params)
        player = Player.find_by(name: params[:player][:name])
        game.player_id = player.id
        if game.save
            render json: game
        else
            render json: {message: game.errors.full_messages}
        end
    end

    def show
        game = Game.find_by(id: params[:id])
        render json: game
    end

    def update
        game = Game.find_by(id: params[:id])
        game.update(game_params)
        render json: game
    end

    private

    def game_params
        params.require(:game).permit(:card_number,:click_number, :score)
    end
end