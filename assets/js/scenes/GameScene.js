import Phaser from 'phaser'
import Player from '../classes/Player.JS'
import Chest from '../classes/Chest.JS'
import Map from '../classes/Map.JS'

class GameScene extends Phaser.Scene {
    constructor() {
        super('Game')
    }

    init() {
        this.scene.launch('UI')
        this.score = 0
    }

    create() {
        this.createMap()
        this.createAudio()
        this.createPlayer()
        this.createInput()
        this.createChests()
        this.spawnChest()
        this.addCollisions()
        
        }

    update() {
    this.player.update(this.cursors)
    }

    createAudio() {
        this.goldPickupAudio = this.sound.add('goldSound', { loop: false, volume: .3 })
    }

    createPlayer() {

        this.player = new Player(this, 224, 224, 'characters', 0)
        this.player.body.setCollideWorldBounds(true)
    }

    createChests() {
        this.chests = this.physics.add.group()
        this.maxNumberOfChests = 3
        this.chestPositions = [[100, 100], [200, 200], [400, 400], [500, 500]]
        for (let i = 0; i < this.maxNumberOfChests; i++) {
            this.spawnChest()
        }
    }

    spawnChest() {
        const location = this.chestPositions[Math.floor(Math.random() * this.chestPositions.length)]
        let chest = this.chests.getFirstDead()

        if (!chest) {
            let chest = new Chest(this, location[0], location[1], 'items', 0)
            this.chests.add(chest)
        } else {
            chest.setPosition(location[0], location[1])
            chest.makeActive()
        }


    }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    addCollisions() {
        this.physics.add.collider(this.player, this.map.blockedLayer)
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this )
    }

    collectChest(player, chest) {
        this.goldPickupAudio.play()
        this.score += chest.coins
        this.events.emit('updateScore', this.score)
        chest.makeInactive()
        this.time.delayedCall(1000, this.spawnChest, [], this)
    }

    createMap() {
        this.map = new Map(this, 'map', 'background', 'background', 'blocked')
    }


}


export default GameScene