import Phaser from 'phaser'

class Monster extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame, id, health, maxHealth) {
        super(scene, x, y, key, frame)
        this.scene = scene
        this.id = id
        this.health = health
        this.maxHealth = maxHealth

        this.scene.physics.world.enable(this)
        this.setScale(2)
        this.setCollideWorldBounds(true)
        this.setImmovable(false)
        this.scene.add.existing(this)
        // this.setSize(18, 15)
        // this.setOffset(8, 18)
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


export default Monster