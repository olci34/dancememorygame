let comparedCards = []
let clicks = 0
const cards = [
                {sticker:'https://media.giphy.com/media/SUtvUAbKeBXiVdqCMB/giphy.gif', matchID: 1}, 
                {sticker:'https://media.giphy.com/media/47GcWwJdOydNTuufsp/giphy.gif', matchID: 2},
                {sticker:'https://media.giphy.com/media/TeBpzQZRaBIC4/giphy.gif', matchID: 3},
                {sticker:'https://media.giphy.com/media/wn8rVP7qC8TNC/giphy.gif', matchID: 4},
                {sticker:'https://media.giphy.com/media/p3BhK7nNlB9AMJrtYh/giphy.gif', matchID: 5}
            ]

const cardBoard = document.querySelector('div.card-board')

class Card {
    
    constructor(sticker, matchID, uniq) {
        this.sticker = sticker
        this.matchID = matchID
        this.uniq = uniq
        this.faceUp = false
    }

    appendCard() {
        const flipCard = document.createElement('div')
        flipCard.className = 'flip-card'
        const flipCardInner = document.createElement('div')
        flipCardInner.className = 'flip-card-outer'
        const frontDiv = document.createElement('div')
        frontDiv.className = 'flip-card-front'
        const backDiv = document.createElement('div')
        backDiv.className = 'flip-card-back'
        flipCardInner.title = this.matchID
        flipCardInner.id = this.uniq
        backDiv.innerHTML = `<img src='${this.sticker}'>`

        flipCardInner.append(frontDiv)
        flipCardInner.append(backDiv)
        flipCard.append(flipCardInner)
        cardBoard.append(flipCard)
        flipCardInner.addEventListener('click', Card.cardListener.bind(this))  // BLOG POST bind(this)
    }

    static cardListener(e) {
        const clickBoard = document.getElementById('click-number')
            clickBoard.innerText = `${++clicks}`
            if (comparedCards.length === 0) {
                comparedCards.push(this)
                comparedCards[0].flipFaceUp(e.currentTarget)
            } else if (comparedCards.length === 1) {
                if (this.faceUp === false) { 
                    comparedCards.push(this)
                    comparedCards[1].flipFaceUp(e.currentTarget)
                    const matchResult = Card.matchCard(comparedCards[0], comparedCards[1])
                    const matchedDOMCards = document.querySelectorAll(`[title='${e.currentTarget.title}']`)
                    if (matchResult) {

                        const scoreBoard = document.getElementById('score')
                        const score = Math.floor((parseInt(scoreBoard.textContent,10)) + 200000 / clicks)
                        scoreBoard.textContent = `${score}`

                        matchedDOMCards.forEach(function(DOMCard) {
                        DOMCard.style.pointerEvents = 'none'
                        DOMCard.children[1].style.backgroundColor = 'rgba(153, 205, 50, 0.267)'
                        })
                        comparedCards = []
                    } 
                } else if (this.faceUp === true) { // If clicked to a only faced up card
                    comparedCards[0].flipFaceDown(e.currentTarget)
                    comparedCards = []
                }
            } else if (comparedCards.length === 2) {
                comparedCards.forEach(function(cardObj) {
                    cardObj.flipFaceDown(document.getElementById(`${cardObj.uniq}`))
                })
                comparedCards = [this]
                comparedCards[0].flipFaceUp(e.currentTarget)
            }
            if (Card.victory()) {
                Game.patchGame()
            }
    }

    static matchCard(card1,card2) {
        if (card1.matchID === card2.matchID) {
            return true
        } else {
            return false
        }
    }

    flipFaceUp(target) {
        target.className = 'flip-card-inner'
        this.faceUp = true
    }

    flipFaceDown(target) {
        target.className = 'flip-card-outer'
        this.faceUp = false
    }

    static victory() {
        const DOMCards = document.querySelectorAll('.flip-card')
        const cardClassNames = [...DOMCards].map(card => card.children[0].className)
        const done = cardClassNames.every((name) => name === 'flip-card-inner')
        if (done) {
            const congratDiv = document.createElement('div')
            congratDiv.className = 'congrat-div'
            const congratLabelDiv = document.createElement('div')
            congratLabelDiv.className = 'congrat-label'
            congratLabelDiv.innerHTML = '<h1>Congratulations</h1>'
            const gameSum = document.createElement('div')
            gameSum.className = 'game-sum'
            gameSum.innerHTML =  "<h1>Player Name</h1><br><h3>Score: </h3><h3>Rank:</h3>"
            congratDiv.append(congratLabelDiv,gameSum)
            cardBoard.innerHTML = ''
            cardBoard.append(congratDiv)
            return true
        }
        return false
    }

    static setCards(cardNumber) {
        let randomCards = [...cards]
        let pairCards = []
    
        for (let i = 0; i < cardNumber/2; i++) {
            const randomCard = randomCards.splice(Math.floor(Math.random() * randomCards.length),1)[0];
            const newCard = new Card(randomCard.sticker, randomCard.matchID)
            const matchCard = new Card(randomCard.sticker, randomCard.matchID)
            pairCards.push(newCard,matchCard)
        }
    
        const shuffledCards = shuffle(pairCards)
        
        for (let i = 0; i < shuffledCards.length; i++) {
            shuffledCards[i].uniq = i
            shuffledCards[i].appendCard()
        }
    }
}