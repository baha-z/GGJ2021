import "phaser";
import { WelcomeScene } from "./welcomeScene";
import { GameScene } from "./gameScene";

const config: GameConfig = {
  title: "Chucho",
  width: 800,
  height: 600,
  parent: "game",
  scene: [WelcomeScene, GameScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  backgroundColor: "#18216D"
};

export class Chucho extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
};

window.onload = () => {
  var game = new Chucho(config);
};
