const gameForm = document.getElementById('form')

fetchData()

function fetchData() {
    const top5 = document.querySelector('.players')
    top5.innerHTML = ''
    fetch('http://localhost:3000/players').then(resp => resp.json())
                                          .then(players => { 
                                                            let sortedPlayers = players.sort( (p1, p2) => p1.rank - p2.rank)
                                                            let top5 = sortedPlayers.slice(0,5)
                                                            top5.forEach(function(player) {
                                                                const newPlayer = new Player(player.rank, player.name, player.latest_score)
                                                                newPlayer.appendPlayer()
                                                            })
                                                        })
}

gameForm.addEventListener('submit', function(e) {
    e.preventDefault()
    Player.createPlayer(e.target)
})

function disableConfig(value) {
    document.getElementById('player-name').disabled = value
    document.getElementById('numberOfCards').disabled = value
    document.getElementById('submit-button').disabled = value
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i+1))
        const temp = array[i]
        array[i] = array[randomIndex]
        array[randomIndex] = temp
    }
    return array
}