const gameForm = document.getElementById('form')

fetchData()

function fetchData() {
    fetch('http://localhost:3000/players').then(resp => resp.json())
                                          .then(players => { 
                                                            let sortedPlayers = players.sort( (p1, p2) => p2.highest_score - p1.highest_score )
                                                            sortedPlayers.forEach(function(player) {
                                                                const newPlayer = new Player(player.rank, player.name, player.highest_score)
                                                                newPlayer.appendPlayer()
                                                            })
                                                        })
}

gameForm.addEventListener('submit', function(e) {
    e.preventDefault()
    Player.createPlayer(e.target)
    Card.setCards(parseInt(e.target.children[4].value, 10))
})

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i+1))
        const temp = array[i]
        array[i] = array[randomIndex]
        array[randomIndex] = temp
    }
    return array
}