import Phaser from 'phaser'

class UIScene extends Phaser.Scene {
    constructor() {
        super('UI')
    }

    init() {
        //grabbing a reference to the Game scene
        this.gameScene = this.scene.get('Game')
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
        // listening to the updateScore event from Game Scene
        this.gameScene.events.on('updateScore', (score) => {
            this.scoreText.setText(`Coins: ${score}`)
        })
    }
}


export default UIScene