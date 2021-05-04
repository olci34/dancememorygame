const topPlayersList = document.querySelector('tbody.players')

function fetchData() {
    fetch('http://localhost:3000/players').then(resp => resp.json()).then(players => appendPlayers(players))
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

fetchData()