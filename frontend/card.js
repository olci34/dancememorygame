let comparedCards = []

class Card {
    
    constructor(sticker, matchID, uniq) {
        this.sticker = sticker
        this.matchID = matchID
        this.uniq = uniq
        this.faceUp = false
    }

    static appendCard(card,id) {
        const flipCard = document.createElement('div')
        flipCard.className = 'flip-card'
        const flipCardInner = document.createElement('div')
        flipCardInner.className = 'flip-card-outer'
        const frontDiv = document.createElement('div')
        frontDiv.className = 'flip-card-front'
        const backDiv = document.createElement('div')
        backDiv.className = 'flip-card-back'
        flipCardInner.title = card.matchID
        flipCardInner.id = id
        backDiv.innerHTML = `<img src='${card.sticker}'>`

        flipCardInner.append(frontDiv)
        flipCardInner.append(backDiv)
        flipCard.append(flipCardInner)
        cardBoard.append(flipCard)

        flipCardInner.addEventListener('click', function(e) {
            if (comparedCards.length === 0) {
                comparedCards.push(card)
                comparedCards[0].flipFaceUp(e.currentTarget)
            } else if (comparedCards.length === 1) {
                if (card.faceUp === false) { 
                    comparedCards.push(card)
                    comparedCards[1].flipFaceUp(e.currentTarget)
                    const matchResult = Card.matchCard(comparedCards[0], comparedCards[1])
                    const matchedDOMCards = document.querySelectorAll(`[title='${e.currentTarget.title}']`)
                    if (matchResult) {
                        matchedDOMCards.forEach(function(DOMCard) {
                        DOMCard.style.pointerEvents = 'none'
                        DOMCard.children[1].style.backgroundColor = 'rgba(153, 205, 50, 0.267)'
                        })
                        comparedCards = []
                    } 
                } else if (card.faceUp === true) {
                    comparedCards[0].flipFaceDown(e.currentTarget)
                    comparedCards = []
                }
            } else if (comparedCards.length === 2) {
                comparedCards.forEach(function(cardObj) {
                    cardObj.flipFaceDown(document.getElementById(`${cardObj.uniq}`))
                })
                comparedCards = [card]
                comparedCards[0].flipFaceUp(e.currentTarget)
            }
        })
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
}