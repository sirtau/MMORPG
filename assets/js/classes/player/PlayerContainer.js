import Phaser from 'phaser'
import Player from './Player.JS'

class PlayerContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y)
        this.scene = scene
        this.velocity = 360
        this.setSize(64, 64)
        this.scene.physics.world.enable(this)

        this.body.setCollideWorldBounds(true)
        this.scene.add.existing(this)
        this.scene.cameras.main.startFollow(this)

        this.player = new Player(this.scene, 0, 0, key, frame)
        this.add(this.player)
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


export default PlayerContainer