import Spawner from "./Spawner"
import {getTiledProperty, SpawnerType} from "./utils"

class GameManager {
    constructor(scene, mapData) {
        this.scene = scene
        this.mapData = mapData

        this.spawners = {}
        this.chests = {}
        this.monsters = {}
        this.playerLocations = []
        this.chestLocations = {}
        this.monsterLocations = {}
        this.setup()
    }

    setup() {
        this.parseMapData()
        this.setupEventListener()
        this.setupSpawners()
        this.spawnPlayer()
    }

    // TODO - Turn the OBJ /2 - /2 etc mess into a quick util function. getPos(obj) or something.
    parseMapData() {
        this.mapData.forEach((layer) => {
            if (layer.name === "player_locations") {
                layer.objects.forEach((obj) => {
                    this.playerLocations.push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)])
                })
            } else if (layer.name === "chest_locations") {
                layer.objects.forEach((obj) => {
                    var spawner = getTiledProperty(obj, "spawner")
                    if (this.chestLocations[spawner]) {
                        this.chestLocations[spawner].push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)])
                    } else {
                        this.chestLocations[spawner] = [[obj.x + (obj.width / 2), obj.y - (obj.height / 2)]]
                    }
                })
            } else if (layer.name === "monster_locations") {
                layer.objects.forEach((obj) => {
                    var spawner = getTiledProperty(obj, "spawner")
                    if (this.monsterLocations[spawner]) {
                        this.monsterLocations[spawner].push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)])
                    } else {
                        this.monsterLocations[spawner] = [[obj.x + (obj.width / 2), obj.y - (obj.height / 2)]]
                    }
                })
            }
        })
    }

    setupEventListener() {
        this.scene.events.on('pickUpChest', (chestID) => {
            if (this.chests[chestID]) {
                this.spawners[this.chests[chestID].spawnerID].removeObject(chestID)
            }
        })

        this.scene.events.on('destroyEnemy', (monsterID) => {
            console.log('destroyed')
            if (this.monsters[monsterID]) {
                this.spawners[this.monsters[monsterID].spawnerID].removeObject(monsterID)
            }
        })
    }

    setupSpawners() {
        const config = {
            spawnInterval: 3000,
            limit: 1,
            spawnerType: SpawnerType.CHEST,
            id: ``
        }
        let spawner
        
        Object.keys(this.chestLocations).forEach(key => {
            config.id = `chest-${key}`

            spawner = new Spawner(
                config, 
                this.chestLocations[key], 
                this.addChest.bind(this), 
                this.deleteChest.bind(this)
            )
            this.spawners[spawner.id] = spawner
        })

        Object.keys(this.monsterLocations).forEach(key => {
            config.id = `monster-${key}`
            config.spawnerType = SpawnerType.MONSTER

            spawner = new Spawner(
                config, 
                this.monsterLocations[key], 
                this.addMonster.bind(this), 
                this.deleteMonster.bind(this)
            )
            this.spawners[spawner.id] = spawner
        })

    }

    spawnPlayer() {
        const location = this.playerLocations[Math.floor(Math.random() * this.playerLocations.length)]
        this.scene.events.emit("spawnPlayer", location)
    }

    addChest(chestID, chest) {
        this.chests[chestID] = chest
        this.scene.events.emit("spawnChest", chest)

    }


    deleteChest(chestID) {
      delete this.chests[chestID]
    }


    addMonster(monsterID, monster) {
        this.monsters[monsterID] = monster
        this.scene.events.emit('monsterSpawned', monster)

    }

    deleteMonster(monsterID) {
        delete this.monsters[monsterID]
    }
}

export default GameManager
