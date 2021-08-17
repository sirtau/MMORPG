import Phaser from 'phaser'

class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame)
        this.scene = scene
        this.velocity = 160

        this.scene.physics.world.enable(this)

        this.setScale(2)
        this.setCollideWorldBounds(true)
        this.setImmovable(false)
        this.scene.add.existing(this)

        
    }

    update(cursors) {
        this.body.setVelocity(0)

        if (cursors.left.isDown) {
            this.body.setVelocityX(-160)
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(160)
        } 
    
        if (cursors.up.isDown) {
            this.body.setVelocityY(-160)
        } else if (cursors.down.isDown) {
            this.body.setVelocityY(160)
        } 
    }

}


export default Player