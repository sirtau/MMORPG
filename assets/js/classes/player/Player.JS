import Phaser from 'phaser'

class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame)
        this.scene = scene

        this.scene.physics.world.enable(this)

        this.setScale(2)
        this.setImmovable(true)
        this.scene.add.existing(this)
        this.setSize(18, 15)
        this.setOffset(8, 18)
    }

}


export default Player