import { GameObjects, Input } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  public speed = 200;
  public scoreText: Phaser.GameObjects.Text;
  public score= 0;

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
    this.cameras.main.setBackgroundColor('#00000');
    this.cameras.main.setZoom(1.5);
    this.cameras.main.centerOnY(0);

    // Add a player sprite that can be moved around. Place him in the middle of the screen.
    this.dog = this.physics.add.sprite( getGameWidth(this)/2 , getGameHeight(this)/2 , 'chucho');
    this.dog.scale=0.05;

    this.input.on('pointerdown', function () {
        this.started = true;
    }, this);
    
    //this.dog.play('idle');

   this.scoreText = this.add.text(100, 16, 'score: '+this.score, { fontSize: '32px', color: '#fff' });
    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursorKeys = this.input.keyboard.createCursorKeys();
   /*  
   this.generateGround(); */
    
    // ROSA  AQUI ESTA EL RANDOM COMENTADO 

    //this.random()
    
    //this.dog.setCollideWorldBounds(true);
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
/*     this.physics.add.overlap(this.dog, this.bone, ()=>console.log("object", this.bone ), null, this);
 */
    // We normalize the velocity so that the player is always moving at the same speed, regardless of direction.
    const normalizedVelocity = velocity.normalize();
    this.dog.setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
  }
  

		const rect = new Phaser.Geom.Rectangle(100, 50, 800, 800)
	
		// Randomly position the sprites within the rectangle
		Phaser.Actions.RandomRectangle(group.getChildren(), rect)
	}
}
