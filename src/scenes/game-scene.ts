import { Input } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  public speed = 200;
  public started = false;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private dog: Phaser.Physics.Arcade.Sprite;
  private bone: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super(sceneConfig);
  }

  public preload(): void {
    //this.load.image('bg', 'assets/pics/backscroll.png');
  }

  public create(): void {

    //camera set up
    this.cameras.main.setBounds(0, 0, 1024, 2048);

    //camera slide on game start 
    this.cameras.main.centerOnY(getGameHeight(this));
    this.input.on('pointerdown', function () {
        var cam = this.cameras.main;
        var location = new Phaser.Math.Vector2(0, 500);
        cam.pan(getGameWidth(this) / 2, getGameHeight(this)/6, 1000, 'Sine.easeInOut');
        this.started = true;
    }, this);

    // Add a player sprite that can be moved around. Place him in the middle of the screen.
    this.dog = this.physics.add.sprite(getGameWidth(this) / 2, getGameHeight(this)/6, 'man');
    //this.bone = this.physics.add.sprite(getGameWidth(this) / 2, getGameHeight(this) / 2, 'bone');

    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.random()
    this.cameras.main.setZoom(1.5);
  }

  public update(): void {
    // Every frame, we create a new velocity for the sprite based on what keys the player is holding down.
    const velocity = new Phaser.Math.Vector2(0, 0);
    this.dog.setVelocity(0);

    //camera follow player 
    if (this.started){
      this.cameras.main.startFollow(this.dog, true);
      //movement 
      velocity.y += 1;
      if (this.cursorKeys.left.isDown) {
        velocity.x -= 1;
      }
      if (this.cursorKeys.right.isDown) {
        velocity.x += 1;
      }
      if (this.cursorKeys.up.isDown) {
        velocity.y -= 1;
      }
    }
        
    // We normalize the velocity so that the player is always moving at the same speed, regardless of direction.
    const normalizedVelocity = velocity.normalize();
    this.dog.setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
  }
  
public random ():void 
	{
		//  Create 300 sprites (they all start life at 0x0)
		const group = this.add.group()
		group.createMultiple({ key: 'bone', frameQuantity: 50 })

		const rect = new Phaser.Geom.Rectangle(100, 50, 800, 800)
	
		//  Randomly position the sprites within the rectangle
		Phaser.Actions.RandomRectangle(group.getChildren(), rect)
	}
}
