import Phaser from 'phaser'

class Chest extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame, coins, id) {
        super(scene, x, y, key, frame)
        this.scene = scene // the scene the object will be added to
        this.coins = coins
        this.id = id

        this.scene.physics.world.enable(this)

        this.setScale(2)
        this.setImmovable(false)
        this.scene.add.existing(this)
    }
    
    makeActive() {
        this.setActive(true)
        this.setVisible(true)
        this.body.checkCollision.none = false
    }
    makeInactive() {
        this.setActive(false)
        this.setVisible(false)
        this.body.checkCollision.none = true
    }
}


export default Chest