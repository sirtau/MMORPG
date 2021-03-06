import Phaser from 'phaser'
import Player from '../classes/player/Player.JS'
import Chest from '../classes/Chest.JS'
import Monster from '../classes/Monster.JS'
import Map from '../classes/Map.JS'
import ChestModel from '../game_manager/ChestModel'
import GameManager from '../game_manager/GameManager'
import Spawner from '../game_manager/Spawner'
import PlayerContainer from '../classes/player/PlayerContainer'

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

        this.createGroups()

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

        this.player = new PlayerContainer(this, location[0] * 2, location[1] * 2, 'characters', 0)
        this.player.body.setCollideWorldBounds(true)
    }

    createGroups() {
        this.chests = this.physics.add.group()
        this.monsters = this.physics.add.group()
    }

    spawnChest(chestObject) {
        let chest = this.chests.getFirstDead()

        if (!chest) {
            let chest = new Chest(this, chestObject.x * 2, chestObject.y * 2, 'items', 0, chestObject.gold, chestObject.id)
            this.chests.add(chest)
        } else {
            chest.coins - chestObject.gold
            chest.id = chestObject.id
            chest.setPosition(chestObject.x * 2, chestObject.y * 2)
            chest.makeActive()
        }


    }

    spawnMonster(monsterObject) {
        let monster = this.monsters.getFirstDead()

        if (!monster) {
            let monster = new Monster(
                this, monsterObject.x * 2, 
                monsterObject.y * 2, 
                'monsters', 
                monsterObject.frame,  
                monsterObject.id,
                monsterObject.health,
                monsterObject.maxHealth
            )
            this.monsters.add(monster)
            monster.setCollideWorldBounds(true);
        } else {
            monster.id = monsterObject.id
            monster.health = monsterObject.health
            monster.maxHealth = monsterObject.maxHealth
            monster.setTexture('monsters', monsterObject.frame)
            monster.setPosition(monsterObject.x * 2, monsterObject.y * 2)
            monster.makeActive()
        }

    }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    addCollisions() {
        this.physics.add.collider(this.player, this.map.blockedLayer)
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this )
        this.physics.add.collider(this.monsters, this.map.blockedLayer)
        this.physics.add.overlap(this.player.weapon, this.monsters, this.enemyOverlap, null, this )
    }

    enemyOverlap(player, enemy) {
        if(this.player.playerAttacking && !this.player.swordhit) {
            this.player.swordHit = true
            enemy.makeInactive()
            this.events.emit('destroyEnemy', enemy.id)
        }
    }

    collectChest(player, chest) {
        this.goldPickupAudio.play()
        this.score += chest.coins
        this.events.emit('updateScore', this.score)
        chest.makeInactive()
        this.events.emit('pickUpChest', chest.id)
    }

    createMap() {
        this.map = new Map(this, 'map', 'background', 'background', 'blocked')
    }

    createGameManager() {


        this.events.on('spawnPlayer', (location) => {
            this.createPlayer(location)
            this.addCollisions()
        })

        this.events.on('spawnChest', (chest) => {
            this.spawnChest(chest)
            this.addCollisions()
        })

        this.events.on('monsterSpawned', (monster) => {
            this.spawnMonster(monster)
            this.addCollisions()
        })
        
        this.gameManager = new GameManager(this, this.map.map.objects)
    }

}


export default GameScene