import Phaser from 'phaser'

class TitleScene extends Phaser.Scene {
    constructor() {
        super('Title')
    }

    create() {

        this.button = this.add.image(this.scale.width / 2, this.scale.height * 0.65, 'button1')
            .setOrigin(.5)
            .setInteractive()

        this.buttonText = this.add.text(0,0, 'Start', { fontSize: '26px', fill: '#fff' })
        Phaser.Display.Align.In.Center(this.buttonText, this.button)
    
        this.button.on('pointerdown', () => {
            this.scene.start('Game')
        })
        this.button.on('pointerover', () => {
            console.log('pointer over')
            this.button.setAlpha(.7)
        })
        this.button.on('pointerout', () => {
            console.log('pointer out')
            this.button.setAlpha(1)
        })

        this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'MMORPG Game Thing', { fontSize: '64px', fill: '#fff' })
        this.titleText.setOrigin(0.5)
    }
}

export default TitleScene