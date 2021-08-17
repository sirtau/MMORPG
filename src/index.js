import Phaser from "phaser";
// create a new scene
let gameScene = new Phaser.Scene('Game');

// set the configuration of the game
let config = {
  type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
  width: 1200,
  height: 600,
  scene: {
    // init: init,
    preload: preload,
    create: create,
    update: update,
    // shutdown: shutdown
  },
  physics: {
      default: 'arcade',
      arcade: {
          debug: true,
          gravity: {
              y: 0,
          }
      }
  }
};

function preload() {
    this.load.image('button1', 'assets/images/ui/blue_button01.png')
    this.load.spritesheet('items', 'assets/images/items.png', {frameWidth: 32, frameHeight: 32})
    this.load.spritesheet('characters', 'assets/images/characters.png', {frameWidth: 32, frameHeight: 32})

}

function create() {
    this.add.image(100, 100, 'button1').setOrigin(0)


    this.physics.add.image(300, 300, 'items', 1)
    this.player = this.physics.add.image(32, 32, 'characters', 0)
    this.player.setScale(2)

    this.cursors = this.input.keyboard.createCursorKeys()

}

function update() {
    this.player.setVelocity(0)
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160)
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160)
    } 


    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-160)
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(160)
    } 
}





// create a new game, pass the configuration
let game = new Phaser.Game(config);