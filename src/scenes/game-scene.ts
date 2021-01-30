import { Input } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  public speed = 200;

  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private dog: Phaser.Physics.Arcade.Sprite;
  private bone: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super(sceneConfig);
  }

  public create(): void {

    //camera on game start 
    this.cameras.main.setBounds(0, 0, 1024, 2048);
    this.cameras.main.centerOn(0, 0);
    this.input.on('pointerdown', function () {
        var cam = this.cameras.main;
        var location = new Phaser.Math.Vector2(0, 500);;
        cam.pan(location.x, location.y, 1000, 'Sine.easeInOut');
    }, this);

    // Add a player sprite that can be moved around. Place him in the middle of the screen.
    this.dog = this.physics.add.sprite(getGameWidth(this) / 2, getGameHeight(this) / 5, 'man');
    this.bone = this.physics.add.sprite(getGameWidth(this) / 2, getGameHeight(this) / 2, 'bone');

    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  public update(): void {
    // Every frame, we create a new velocity for the sprite based on what keys the player is holding down.
    const velocity = new Phaser.Math.Vector2(0, 0);

    if (this.cursorKeys.left.isDown) {
      velocity.x -= 1;
    }
    if (this.cursorKeys.right.isDown) {
      velocity.x += 1;
    }
    if (this.cursorKeys.up.isDown) {
      velocity.y -= 1;
    }
      velocity.y += 1;
    

    // We normalize the velocity so that the player is always moving at the same speed, regardless of direction.
    const normalizedVelocity = velocity.normalize();
    this.dog.setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
  }
}
