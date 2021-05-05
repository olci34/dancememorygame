const topPlayersList = document.querySelector('tbody.players')
const cardBoard = document.querySelector('div.card-board')
const gameForm = document.getElementById('form')
fetchData()

function fetchData() {
    fetch('http://localhost:3000/players').then(resp => resp.json())
                                          .then(players => { 
                                                            let sortedPlayers = players.sort( (p1, p2) => p2.highest_score - p1.highest_score )
                                                            return appendPlayers(sortedPlayers)
                                                        })
}

function appendPlayers(players) {
    players.map(function(player) {
        appendPlayer(player)
    })
}

function appendPlayer(player) {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `<td>${player.rank}</td>
                        <td>${player.name}</td>
                        <td>${player.highest_score}`
    topPlayersList.appendChild(newRow)
}

gameForm.addEventListener('submit', function(e) {
    e.preventDefault()
    createPlayer(e)
})

function createPlayer(e) {
    const playerName = e.target.children[1].value
    const gameCardNumber = parseInt(e.target.children[4].value, 10)
    const newPlayer = {player: { name: playerName }} // game_attributes
    const configPlayer = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newPlayer)
    }

    fetch('http://localhost:3000/players', configPlayer).then(resp => resp.json())
                                                        .then(player => { 
                                                                        startGame(gameCardNumber)
                                                                        return appendPlayer(player)
                                                                    })
    
}

function startGame(cardNumber) {
    for (let i = 0; i < cardNumber; i++) {
        const flipCard = document.createElement('div')
        flipCard.className = 'flip-card'

        const flipCardInner = document.createElement('div')
        flipCardInner.className = 'flip-card-inner'

        const frontDiv = document.createElement('div')
        frontDiv.className = 'flip-card-front'

        const backDiv = document.createElement('div')
        backDiv.className = 'flip-card-back'

        flipCardInner.append(frontDiv)
        flipCardInner.append(backDiv)
        flipCard.append(flipCardInner)
        cardBoard.append(flipCard)
    }
}
