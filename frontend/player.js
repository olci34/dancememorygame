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
}