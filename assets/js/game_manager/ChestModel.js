import { v4 as uuidv4 } from 'uuid';

class ChestModel {
    constructor(x, y, gold, spawnerID) {
        this.id = `${spawnerID}-${uuidv4()}`
        this.spawnerID = spawnerID
        this.x = x
        this.y = y
        this.gold = gold

    }
}

export default ChestModel