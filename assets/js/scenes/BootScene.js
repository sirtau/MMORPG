import Phaser from 'phaser'

class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot')
    }

    preload() {
        this.load.image('button1', 'assets/images/ui/blue_button01.png')
        this.load.spritesheet('items', 'assets/images/items.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('characters', 'assets/images/characters.png', {frameWidth: 32, frameHeight: 32})
        this.load.audio('goldSound', ['assets/audio/Pickup.wav'])
    }

    create() {
        let goldPickupAudio = this.sound.add('goldSound', { loop: false, volume: .3 })

        this.wall = this.physics.add.image(100, 100, 'button1')
            .setOrigin(0)
            .setImmovable()
    
    
        this.chest = this.physics.add.image(300, 300, 'items', 0)
        this.player = this.physics.add.image(32, 32, 'characters', 0)
            .setScale(2)
    
        this.cursors = this.input.keyboard.createCursorKeys()
    
        this.player.body.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.wall)
        this.physics.add.overlap(this.player, this.chest, function(player, chest) {goldPickupAudio.play(); chest.destroy()} )
    }


    update() {
        this.player.setVelocity(0)
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160)
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160)
        } 
    
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160)
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160)
        } 
    }
}


export default BootScene