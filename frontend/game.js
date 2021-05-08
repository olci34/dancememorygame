class Game {

    constructor(card_number, click_number, score) {
        this.card_number = card_number
        this.click_number = click_number
        this.score = score
    }

    finalizeScore() {
        this.score = (this.card_number * 100000) / this.click_number
    }

    patchGame() {
        const numberOfClicks = parseInt(document.getElementById('click-number').textContent, 10)
        const gameID = document.getElementById('gameID').value
        const gameObj = {game: {click_number: numberOfClicks}}
        const configGame = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',
                      'Accept':'application/json'},
            body: JSON.stringify(gameObj)
        }
        fetch(`http://localhost:3000/games/${gameID}`, configGame).then(resp => resp.json())
                                            .then(function(games) {
                                                debugger
                                                const currentGame = games.filter(game => game.id === gameID)
                                                currentGame.finalizeScore()
                                                debugger
                                            })

                                        }
}