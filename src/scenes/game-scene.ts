import { GameObjects, Input, Physics } from 'phaser';
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
  private bones:any;
  private batteries: any;


  constructor() {
    super(sceneConfig);
  }

  public preload(): void {
    //this.load.image('bg', 'assets/pics/backscroll.png');
  }

  public create(): void {
    //camera set up
    this.cameras.main.setBounds(0, 0, 1024, 2048);
    this.cameras.main.setBackgroundColor('#fff');
    this.cameras.main.setZoom(1.5);
    this.cameras.main.centerOnY(0);

    // Add  Sprite and Place him in the  screen.
    this.dog = this.physics.add.sprite( getGameWidth(this)/3 , getGameHeight(this)/3 , 'chucho');


    this.dog.scale=0.05;


    this.input.on('pointerdown', function () {
        this.started = true;
    }, this);
    
    //this.dog.play('idle');

   this.scoreText = this.add.text(900, 900, 'score: '+ this.score, { fontSize: '32px', color: '#000' });
    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    
   this.generateGround(); 
  
   const customBounds = new Phaser.Geom.Rectangle(50 , 300, 600, 2000);

  this.bones = this.random(this.bones, 'bone',10); 
  this.physics.add.overlap(this.bones,this.dog);
  Phaser.Actions.RandomRectangle(this.bones.getChildren(), customBounds);

  this.batteries = this.random(this.batteries, 'dog',10); 
  this.physics.add.overlap(this.batteries,this.dog);
  Phaser.Actions.RandomRectangle(this.batteries.getChildren(), customBounds);

   /* this.random(this.bones, 'bone',10);    
   this.random(this.batteries, 'dog',30);     */

/*   this.dog.setCollideWorldBounds(true);*///// 
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


     ///// COLLAIDERS 
    this.physics.add.collider(this.dog, this.bones, this.collect, null, this);
    this.physics.add.collider(this.dog, this.batteries, this.collect, null, this);
    this.physics.add.collider(this.bones, this.batteries, this.remove, null, this);



    // We normalize the velocity so that the player is always moving at the same speed, regardless of direction.
    const normalizedVelocity = velocity.normalize();
    this.dog.setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
  }
  
  public random (group:any, key:string, quantity:number ): Physics.Arcade.Group 
	{
    const customBounds = new Phaser.Geom.Rectangle(50 , 300, 600, 2000);

    return group = this.physics.add.group({
        key: key,
        frameQuantity: quantity,
        customBoundsRectangle: customBounds,
        collideWorldBounds: true,
        gridAlign:{  
          width: 600,
          height: 1500,
          cellWidth: 50,
          cellHeight: 50,
          x: 20,
          y: 50,
        },
    });

  }

    public collect (dog ,consumable )
    {
      if(consumable.texture.key === 'bone'){
      consumable.destroy();
        this.score += 10;
        this.scoreText.setText("Score: " + this.score)
    }
      if(consumable.texture.key === 'dog'){
        consumable.destroy();

        // rechargeLight
        this.score += 100;
        this.scoreText.setText("Score: " + this.score)
      }
    } 
    public  remove(object: any, garbage: any) {
      garbage.destroy();

    }
  public generateGround (){
    const  grounds = this.add.group();   
    grounds.createMultiple({ key: 'grounds', frame: [0,1,2,3,4,5,6], randomFrame: true, frameQuantity: 50,repeat: 1, yoyo:true });
    Phaser.Actions.SetXY(grounds.getChildren(), 10, 100, 10,50);
  }
	
}
