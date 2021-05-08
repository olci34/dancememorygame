class Player {

    constructor(rank, name, highest_score) {
        this.rank = rank
        this.name = name
        this.highest_score = highest_score
    }
    
    static createPlayer(target) {
        const playerName = target.children[1].value
        const gameCardNumber = parseInt(target.children[4].value, 10)
        const newPlayer = {player: {name: playerName, games_attributes: {"0": {card_number: gameCardNumber}}}} // game_attributes
        const configPlayer = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newPlayer)
        }
    
        fetch('http://localhost:3000/players', configPlayer).then(resp => resp.json())
                                                            .then(player => {
                                                                            const gameID = document.getElementById('gameID')
                                                                            gameID.value = player.games[player.games.length - 1].id
                                                                            document.querySelector('.click-counter').append(gameID)
                                                                            const currentPlayer = new Player(player.rank, player.name, player.highest_score)
                                                                            currentPlayer.appendPlayer()
                                                                        })
    }

    appendPlayer() {
        const topPlayersList = document.querySelector('tbody.players')
        const newRow = document.createElement('tr')
        newRow.innerHTML = `<td>${this.rank}</td>
                            <td>${this.name}</td>
                            <td>${this.highest_score}</td>`
        topPlayersList.appendChild(newRow)
        }

    calculateHighestScore() {
        // fetch the player's games scores and find the highest one
    }
}