import Phaser from 'phaser'

class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot')
    }

    preload() {
        this.loadImages()
        this.loadSpiteSheets()
        this.loadAudio()
    }

    loadImages() {
        this.load.image('button1', 'assets/images/ui/blue_button01.png')
        this.load.image('button2', 'assets/images/ui/blue_button02.png')
    }

    loadSpiteSheets() {
        this.load.spritesheet('items', 'assets/images/items.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('characters', 'assets/images/characters.png', {frameWidth: 32, frameHeight: 32})
    }

    loadAudio() {
        this.load.audio('goldSound', ['assets/audio/Pickup.wav'])
    }

    create() {
        this.scene.start('Title')
    }
}


export default BootScene