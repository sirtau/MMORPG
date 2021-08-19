import { v4 as uuidv4 } from 'uuid';

class MonsterModel {
    constructor(x, y, gold, spawnerID, frame, health, attack) {
        this.id = `${spawnerID}-${uuidv4()}`
        this.spawnerID = spawnerID
        this.x = x
        this.y = y
        this.gold = gold
        this.frame = frame
        this.health = health
        this.attack = attack

    }
}

export default MonsterModel