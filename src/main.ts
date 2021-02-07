import * as Phaser from 'phaser';
import Scenes from './scenes';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',

  type: Phaser.AUTO,

  scale: {
    width: 400, //window.innerWidth,
    height: 635, //window.innerHeight,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  scene: Scenes,

  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },

  parent: 'game',
  backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
