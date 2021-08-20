import Phaser from 'phaser'
import Player from './Player.JS'

const Direction = {
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
    UP: 'UP',
    DOWNL: 'DOWN',
}

class PlayerContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y)
        this.scene = scene
        this.velocity = 360
        this.currentDirection = Direction.RIGHT
        this.playerAttacking = false
        this.flipX = true
        this.swordHit = false

        

        this.setSize(32, 32)
        // physics need to be enabled to create the Body, which can then be modified with .body.<method>
        this.scene.physics.world.enable(this)
        this.body.setCollideWorldBounds(true)
        this.body.setOffset(0, 18)
        
        this.scene.add.existing(this)
        this.scene.cameras.main.startFollow(this)

        this.player = new Player(this.scene, 0, 0, key, frame)
        

        this.weapon = this.scene.add.image(40, 0, 'items', 4)
        this.scene.add.existing(this.weapon)
        this.weapon.setScale(1.5)
        this.scene.physics.world.enable(this.weapon)
        this.add(this.weapon)
        this.add(this.player)
        this.weapon.alpha = 0
    }

    update(cursors) {
        this.body.setVelocity(0)

        if (cursors.left.isDown) {
            this.body.setVelocityX(-160)
            this.currentDirection = Direction.LEFT
            this.weapon.setPosition(-40, 10)
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(160)
            this.currentDirection = Direction.RIGHT
            this.weapon.setPosition(40, 10)
        } 
    
        if (cursors.up.isDown) {
            this.body.setVelocityY(-160)
            this.currentDirection = Direction.UP
            this.weapon.setPosition(0, -20)
        } else if (cursors.down.isDown) {
            this.body.setVelocityY(160)
            this.currentDirection = Direction.DOWN
            this.weapon.setPosition(0, 50)
        } 
        
        if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.playerAttacking) {
            console.log('attack')
            this.weapon.alpha = 1
            this.playerAttacking = true
            this.scene.time.delayedCall(150, () => {
                this.weapon.alpha = 0
                this.playerAttacking = false
                this.swordHit = false
            }, [], this)
        }

        if (this.playerAttacking) {
            if (this.weapon.fipX) {
                this.weapon.angle -= 10
            } else {
                this.weapon.angle += 10
            }

        } else {
            if (this.currentDirection === Direction.DOWN) {
                this.weapon.setAngle(-270)
            } else if (this.currentDirection === Direction.UP) {
                this.weapon.setAngle(-90)
            } else if (this.currentDirection === Direction.LEFT) {
                this.weapon.setAngle(-90)
            } else {
                this.weapon.setAngle(0)
            }
            this.weapon.flipX = false
            if (this.currentDirection === Direction.LEFT) {
                this.weapon.flipX = true
            }
         }
    }

}


export default PlayerContainer