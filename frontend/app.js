const topPlayersList = document.querySelector('tbody.players')
const cardBoard = document.querySelector('div.card-board')
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
        const newRow = document.createElement('tr')
        newRow.innerHTML = `<td>${player.rank}</td>
                            <td>${player.name}</td>
                            <td>${player.highest_score}`
        topPlayersList.appendChild(newRow)
    })
}

const gameForm = document.getElementById('form')

gameForm.addEventListener('submit', function(e) {
    e.preventDefault()
    cardBoard.innerHTML = '<h2>Cards are distributed</h2>'
})
