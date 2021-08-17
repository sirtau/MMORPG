import Phaser from 'phaser'

class UIScene extends Phaser.Scene {
    constructor() {
        super('UI')
    }

    create() {
        this.setupUIElements()
        this.setupEvents()


    }

    setupUIElements() {
        this.scoreText = this.add.text(35, 8, 'Coins: 0', {fontSize: '16px', fill: '#fff'})
        this.coinIcon = this.add.image(15, 15, 'items', 3)
    }

    setupEvents() {

    }
}


export default UIScene