import Phaser from 'phaser'

class Chest extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame)
        this.scene = scene
        this.coins = 10

        this.scene.physics.world.enable(this)

        this.setScale(2)
        this.setImmovable(false)
        this.scene.add.existing(this)
    }

}


export default Chest