import Phaser from 'phaser'
import Player from '../classes/Player.JS'
import Chest from '../classes/Chest.JS'
import Map from '../classes/Map.JS'
import ChestModel from '../game_manager/ChestModel'
import GameManager from '../game_manager/GameManager'
import Spawner from '../game_manager/Spawner'

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

        this.createChests()
        this.spawnChest()
        this.createInput()
        
        this.createGameManager()
        }

    update() {
    if (!this.player) return;
    this.player.update(this.cursors)
    }

    createAudio() {
        this.goldPickupAudio = this.sound.add('goldSound', { loop: false, volume: .3 })
    }

    createPlayer(location) {

        this.player = new Player(this, location[0] * 2, location[1] * 2, 'characters', 0)
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

    createGameManager() {


        this.events.on('spawnPlayer', (location) => {
            this.createPlayer(location)
            this.addCollisions()
        })
        this.gameManager = new GameManager(this, this.map.map.objects)
    }

}


export default GameScene