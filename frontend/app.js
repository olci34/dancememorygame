const gameForm = document.getElementById('form')

Player.listTopFive()

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