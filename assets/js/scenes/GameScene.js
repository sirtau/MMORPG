import Phaser from 'phaser'
import Player from '../classes/Player.JS'
import Chest from '../classes/Chest.JS'

class GameScene extends Phaser.Scene {
    constructor() {
        super('Game')
    }

    init() {
        this.scene.launch('UI')
    }

    create() {
        this.goldPickupAudio = this.sound.add('goldSound', { loop: false, volume: .3 })

        this.wall = this.physics.add.image(100, 100, 'button1')
            .setOrigin(0)
            .setImmovable()
    
        this.cursors = this.input.keyboard.createCursorKeys()
        this.chest = new Chest(this, 300, 300, 'items', 0)
        this.player = new Player(this, 32, 32, 'characters', 0)
    

    
        this.player.body.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.wall)
        this.physics.add.overlap(this.player, this.chest, this.collectChest, null, this )
    }

    update() {
    this.player.update(this.cursors)
    }

    collectChest(player, chest) {
        this.goldPickupAudio.play()
        this.events.emit('updateScore', chest.coins)
        chest.destroy()
    }
}


export default GameScene