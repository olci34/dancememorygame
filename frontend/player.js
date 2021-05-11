class Player {

    constructor(rank, name, latest_score) {
        this.rank = rank
        this.name = name
        this.latest_score = latest_score
    }
    
    static createPlayer(target) {
        const playerName = target.children[2].value
        const gameCardNumber = parseInt(target.children[6].value, 10)
        const newPlayer = {player: {name: playerName, games_attributes: {"0": {card_number: gameCardNumber}}}} // game_attributes
        const configPlayer = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', "Accept": "application/json"},
            body: JSON.stringify(newPlayer)
        }
        
            fetch('http://localhost:3000/players', configPlayer)
           .then(resp => resp.json())
           .then(player => {
               if (player.id) {
                    const gameID = document.getElementById('gameID')
                    const lastGame = player.games[player.games.length - 1]
                    gameID.value = lastGame.id
                    document.querySelector('.click-counter').append(gameID)
                    const currentPlayer = new Player(player.rank, player.name, player.latest_score)
                    currentPlayer.appendPlayer() 
                    Card.setCards(gameCardNumber)
                    disableConfig(false)
                } else {
                   throw new Error(player.message) /// add alert DOM
                }
           }).catch(err => alert(err))
    }

    appendPlayer() {
        const topPlayersList = document.querySelector('tbody.players')
        const newRow = document.createElement('tr')
        newRow.innerHTML = `<td>${this.rank}</td>
                            <td>${this.name}</td>
                            <td>${this.latest_score}</td>`
        topPlayersList.appendChild(newRow)
        }
}