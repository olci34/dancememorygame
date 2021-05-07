class Game {

    constructor(card_number, click_number, score) {
        this.card_number = card_number
        this.click_number = click_number
        this.score = score
    }

    calculateScore() {
        (this.card_number * 100000) / this.click_number
    }

}