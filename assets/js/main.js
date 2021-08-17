import Phaser from "phaser";
import BootScene from './scenes/BootScene.js'
import TitleScene from './scenes/TitleScene.js'
import GameScene from './scenes/GameScene.js'
import UIScene from './scenes/UIScene.js'

let config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  pixelArt: true,
  scene: [
      BootScene,
      TitleScene,
      GameScene,
      UIScene
  ],
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

let game = new Phaser.Game(config);