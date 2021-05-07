class Player {

    constructor(rank, name, highest_score) {
        this.rank = rank
        this.name = name
        this.highest_score = highest_score
    }
    
    appendPlayer() {
        const topPlayersList = document.querySelector('tbody.players')
        const newRow = document.createElement('tr')
        newRow.innerHTML = `<td>${this.rank}</td>
                            <td>${this.name}</td>
                            <td>${this.highest_score}</td>`
        topPlayersList.appendChild(newRow)
    }

    static createPlayer(target) {
        const playerName = target.children[1].value
        const gameCardNumber = parseInt(target.children[4].value, 10)
        const newPlayer = {player: { name: playerName }} // game_attributes
        const configPlayer = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newPlayer)
        }
    
        fetch('http://localhost:3000/players', configPlayer).then(resp => resp.json())
                                                            .then(player => {
                                                                            const currentPlayer = new Player(player.rank, player.name, player.highest_score)
                                                                            currentPlayer.appendPlayer()
                                                                        })
    }
}