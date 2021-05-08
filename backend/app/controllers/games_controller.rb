class GamesController < ApplicationController

    def index
        games = Game.all
        render json: games
    end

    def show
        game = Game.find_by(id: params[:id])
        render json: game
    end

    def update
        game = Game.find_by(id: params[:id])
        game.update(game_params)
    end

    private

    def game_params
        params.require(:game).permit(:click_number, :score)
    end
end
