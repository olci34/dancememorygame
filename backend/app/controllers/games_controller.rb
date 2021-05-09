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
        game.player.latest_score = game.score
        game.player.save
        Player.all.sort_by(&:latest_score).reverse.slice(0,5).each.with_index(1) do |player,index|
            player.rank = index
            player.save
        end
    end

    private

    def game_params
        params.require(:game).permit(:click_number, :score)
    end
end
