class Game {

    constructor(card_number, click_number, score) {
        this.card_number = card_number
        this.click_number = click_number
        this.score = score
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
        fetch(`https://dancememorydemo.herokuapp.com//games/${gameID}`, options).then(resp => resp.json()).then(game => setTimeout(() => this.showGameResults(game), 1000))
    }

    static showGameResults(game) {
        const newGameForm = document.createElement('form')
        newGameForm.id = 'new-game-form'
        const newGameInput = document.createElement('input')
        newGameInput.type = 'number'
        newGameInput.max = '16'
        newGameInput.min = '4'
        newGameInput.step = '2'
        newGameInput.id = 'new-game-card-number'
        newGameInput.placeholder = 'Card quantity'
        const newGameButton = document.createElement('input')
        newGameButton.type = 'submit'
        newGameButton.value = 'New Game'
        const congratDiv = document.createElement('div')
        congratDiv.className = 'congrat-div'
        const congratLabelDiv = document.createElement('div')
        congratLabelDiv.className = 'congrat-label'
        congratLabelDiv.innerHTML = '<h1>Congratulations</h1>'
        const gameSum = document.createElement('div')
        gameSum.className = 'game-sum'
        gameSum.innerHTML =  `<h1>${game.player.name}</h1><br><h2>Your Score: ${game.score}</h2><br><h2>Your Rank: ${game.player.rank}</h2>`
        
        newGameForm.addEventListener('submit', Game.setNewGame)
        newGameForm.append(gameSum,newGameInput,newGameButton)
        congratDiv.append(congratLabelDiv,newGameForm)
        cardBoard.innerHTML = ''
        cardBoard.append(congratDiv)
        // disableConfig(false)
        Player.listTopFive()
    }

    static setNewGame(e) {
        e.preventDefault()
        clicks = 0
        const gameID = document.getElementById('gameID')
        const playerName = e.target.children[0].children[0].textContent
        const newGameCardNumber = e.target.children[1].value
        const gameObj = {game: {card_number: newGameCardNumber}, player: {name: playerName}}
        const configGame = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(gameObj)
        }

        fetch('https://dancememorydemo.herokuapp.com//games',configGame)
        .then(resp => resp.json())
        .then(function(game) {
            gameID.value = game.id
            Player.listTopFive()
            Card.setCards(game.card_number)
            // disableConfig(true)
        })
    }

    static victory() {
        return allCards.every(card => card.faceUp === true)
    }

    static changeScoreBoard() {
        const scoreBoard = document.getElementById('score')
        const score = Math.floor((parseInt(scoreBoard.textContent,10)) + 200000 / clicks)
        scoreBoard.textContent = `${score}`
    }
    
}