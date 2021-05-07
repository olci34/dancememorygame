const topPlayersList = document.querySelector('tbody.players')
const cardBoard = document.querySelector('div.card-board')
const gameForm = document.getElementById('form')
const cards =[{sticker:'https://media.giphy.com/media/SUtvUAbKeBXiVdqCMB/giphy.gif', matchID: 1}, 
              {sticker:'https://media.giphy.com/media/47GcWwJdOydNTuufsp/giphy.gif', matchID: 2},
              {sticker:'https://media.giphy.com/media/TeBpzQZRaBIC4/giphy.gif', matchID: 3},
              {sticker:'https://media.giphy.com/media/wn8rVP7qC8TNC/giphy.gif', matchID: 4},
              {sticker:'https://media.giphy.com/media/p3BhK7nNlB9AMJrtYh/giphy.gif', matchID: 5}]

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
})



function setCards(cardNumber) {
    let randomCards = [...cards]
    let shuffledCards = []

    for (let i = 0; i < cardNumber/2; i++) {
        const randomCard = randomCards.splice(Math.floor(Math.random() * randomCards.length),1)[0];
        const newCard = new Card(randomCard.sticker, randomCard.matchID)
        const matchCard = new Card(randomCard.sticker, randomCard.matchID)
        shuffledCards.push(newCard,matchCard)
    }

    shuffledCards = shuffle(shuffledCards)
    
    for (let i = 0; i < shuffledCards.length; i++) {
        shuffledCards[i].uniq = i
        Card.appendCard(shuffledCards[i], shuffledCards[i].uniq)
    }
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