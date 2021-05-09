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
        fetch(`http://localhost:3000/games/${gameID}`, options).then(resp => resp.json()).then(game => this.showGameResults(game))
    }

    static showGameResults(game) {
        const newGameForm = document.createElement('form')
        newGameForm.id = 'new-game-form'
        const newGameInput = document.createElement('input')
        newGameInput.id = 'new-game-card-number'
        newGameInput.placeholder = 'Enter new game card number'
        const newGameButton = document.createElement('input')
        newGameButton.type = 'submit'
        newGameButton.innerText = 'New Game'
        const congratDiv = document.createElement('div')
        congratDiv.className = 'congrat-div'
        const congratLabelDiv = document.createElement('div')
        congratLabelDiv.className = 'congrat-label'
        congratLabelDiv.innerHTML = '<h1>Congratulations</h1>'
        const gameSum = document.createElement('div')
        gameSum.className = 'game-sum'
        gameSum.innerHTML =  `<h1>${game.player.name}</h1><br><h2>Your Score: ${game.score}</h2>`
        
        newGameForm.addEventListener('submit', Game.setNewGame)
        newGameForm.append(gameSum,newGameInput,newGameButton)
        congratDiv.append(congratLabelDiv,newGameForm)
        cardBoard.innerHTML = ''
        cardBoard.append(congratDiv)
    }

    static setNewGame(e) {
        e.preventDefault()
        ///  MAKE A GAME POST REQUEST
        const playerName = e.target.children[0].children[0].textContent
        const newGameCardNumber = e.target.children[1].value
        const gameObj = {game: {card_number: newGameCardNumber}, player: {name: playerName}}
        const configGame = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(gameObj)
        }

        fetch('http://localhost:3000/games',configGame).then(resp => resp.json()).then(console.log)
        cardBoard.innerHTML = ''
        const top5 = document.querySelector('.players')
        top5.innerHTML = ''
        const score = document.getElementById('score')
        score.innerText = '0'
        const clickNumber = document.getElementById('click-number')
        clickNumber.innerText = '0'
        const cardsNumber = document.getElementById('numberOfCards')
        cardsNumber.value = ''
        fetchData()
        disableConfig(false)
    }

    static victory() {
        const DOMCards = document.querySelectorAll('.flip-card')
        const cardClassNames = [...DOMCards].map(card => card.children[0].className)
        const done = cardClassNames.every((name) => name === 'flip-card-inner')
        return done
    }
}