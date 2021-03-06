

class Map {
    constructor(scene, key, tileSetName, bgLayerName, blockedLayerName) {
        this.scene = scene
        this.key = key
        this.tileSetName = tileSetName
        this.bgLayerName = bgLayerName
        this.blockedLayerName = blockedLayerName
        this.createMap()

    }

    createMap() {
        this.map = this.scene.make.tilemap({key: this.key})

        this.tiles = this.map.addTilesetImage(this.tileSetName, this.tileSetName, 32, 32, 1, 2)

        this.backgroundLayer = this.map.createLayer(this.bgLayerName, this.tiles, 0, 0)
            .setScale(2)
        this.blockedLayer = this.map.createLayer(this.blockedLayerName, this.tiles, 0, 0)
            .setScale(2)
            .setCollisionByExclusion([-1])


        this.scene.physics.world.bounds.width = this.map.widthInPixels * 2
        this.scene.physics.world.bounds.height = this.map.heightInPixels * 2
        this.scene.cameras.main.setBounds(0,0, this.map.widthInPixels * 2, this.map.heightInPixels * 2)
    }
}


export default Map