class Game {

    constructor(card_number, click_number, score) {
        this.card_number = card_number
        this.click_number = click_number
        this.score = score
    }

    finalizeScore() {
        this.score = (this.card_number * 100000) / this.click_number
    }

    static patchGame() {
        const numberOfClicks = parseInt(document.getElementById('click-number').textContent, 10)
        const score = parseInt(document.getElementById('score').textContent,10)
        const gameID = document.getElementById('gameID').value
        const gameObj = {game: {click_number: numberOfClicks, score: score}}
        const options = {
            method: "PATCH",
            headers: {"Content-Type": "application/json",
                      "Accept": "application/json"},
            body: JSON.stringify(gameObj)
        }
        fetch(`http://localhost:3000/games/${gameID}`, options).then(resp => resp.json()).then(console.log)
    }
}