import { GameObjects, Input, Physics } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';
import { EnergyText } from '../tools/energy-text';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  public speed = 200;
  public scoreText: Phaser.GameObjects.Text;
  public score = 0;
  public started = false;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private dog: Phaser.Physics.Arcade.Sprite;
  private bones:any;
  private batteries: any;
  private grounds: any;
  private energytext: EnergyText;


  constructor() {
    super(sceneConfig);
  }

  public preload(): void {
    this.load.image('bg_main', 'assets/background/bg_main.png');
    
    const music = this.sound.add('bg_music', { volume: 0.5, loop: true });
    //music.play();
  }

  public create(): void {
    //camera set up
    this.cameras.main.setBounds(0, 0, 120, 2280);
    this.cameras.main.setBackgroundColor('#4f3f3f');
    this.cameras.main.setZoom(1.5);
    this.cameras.main.centerOnY(0);

    //bg screen
    const bg = this.add.image(130, 130, 'bg_main');
    bg.scale = 0.2; // Resize the imag
   
    // Add  Sprite and Place him in the  screen.
    this.dog = this.physics.add.sprite(getGameWidth(this) / 3, getGameHeight(this) / 2.8, 'chucho');

    this.animations();

    this.dog.scale = 0.09;
    this.dog.play('idle_anim');

    this.input.on('pointerdown', function () {
      this.started = true;

      

      this.dog.play('dig_anim');
    }, this);

    this.energytext = new EnergyText(this, this.dog);
    this.energytext.drawn(this.started);
 
    
    //this.dog.play('idle');
    // this.lantern = new Lantern(this, this.dog);
    // this.lantern.turnOn();

    this.scoreText = this.add.text(10, this.dog.y - 200, this.started ? '🦴: ' + this.score : '', { font: '25px Courier', color: '#FFF' });
    this.scoreText.setDepth(1);
    
    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    
    this.grounds= this.generateGround(this.grounds); 
  
   const customBounds = new Phaser.Geom.Rectangle(50 , 300, 600, 2000);

  this.bones = this.random(this.bones, 'bone',10); 
  this.physics.add.overlap(this.bones,this.dog);
  Phaser.Actions.RandomRectangle(this.bones.getChildren(), customBounds);

  this.batteries = this.random(this.batteries, 'battery',10); 
  this.physics.add.overlap(this.batteries,this.dog);
  Phaser.Actions.RandomRectangle(this.batteries.getChildren(), customBounds);
  this.physics.add.overlap(this.dog,this.grounds);
  this.physics.add.overlap(this.bones,this.grounds);
  this.physics.add.overlap(this.batteries,this.grounds);
  

/*   this.dog.setCollideWorldBounds(true);*///// 
  }
  public update(): void {

    this.energytext.refresh(this.started);

    // Every frame, we create a new velocity for the sprite based on what keys the player is holding down.
    const velocity = new Phaser.Math.Vector2(0, 0);
    this.dog.setVelocity(0);

    //camera follow player 
    if (this.started) {

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
    this.physics.add.collider(this.dog, this.grounds, this.remove, null, this);
    this.physics.add.collider(this.dog, this.bones, this.collect, null, this);
    this.physics.add.collider(this.dog, this.batteries, this.collect, null, this);
    this.physics.add.collider(this.bones, this.batteries, this.remove, null, this);
    this.physics.add.collider(this.bones, this.grounds, this.remove, null, this);
    this.physics.add.collider(this.batteries, this.grounds, this.remove, null, this);
    // We normalize the velocity so that the player is always moving at the same speed, regardless of direction.
    const normalizedVelocity = velocity.normalize();
    this.dog.setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
    this.scoreText.y = this.dog.y - 180;
  }
  
  public random (group:any, key:string, quantity:number ): Physics.Arcade.Group 
	{
    const customBounds = new Phaser.Geom.Rectangle(50 , 300, 600, 2000);
    return group = this.physics.add.group({
      key: key,
      frameQuantity: quantity,
      customBoundsRectangle: customBounds,
      collideWorldBounds: true,
      setScale: {
        x: 0.03,
        y: 0.03,
      },
      gridAlign: {
        width: 600,
        height: 1500,
        cellWidth: 50,
        cellHeight: 50,
        x: 50,
        y: 30,
      },
    });
  }

  public generateGround (group:any):Physics.Arcade.Group {
    return group = this.physics.add.group({
        key: 'grounds',
        frame: [0,1,2,3,4,5,6,7],
        frameQuantity: 1000,
        //allowRotation:true,
        randomFrame:true,
        randomKey:true,
        hitAreaCallback:this.remove ,
        gridAlign:{  
          width: 150,
          height: getGameHeight(this),
          cellWidth: 40,
          cellHeight: 40,
          x: 20,
          y: 290,
        },
    });
  }

    public collect (dog ,consumable )
    {
      if(consumable.texture.key === 'bone'){
      consumable.destroy();
        this.score += 10;
        this.scoreText.setText(this.started ? "🦴: " + this.score : '')
    }
      if(consumable.texture.key === 'battery'){
        this.energytext.recharge(this.started);
        consumable.destroy();
        this.scoreText.setText(this.started ? "🦴: " + this.score : '')
      }
    } 
    public  remove(object: any, garbage: any) {
      garbage.destroy();

    }
	
  public animations (){
      this.anims.create({
          frames: 'chucho_idle',
          key: 'idle_anim',
          duration: 1000,
          repeat: -1
      });
      this.anims.create({
        key: 'dig_anim',
        frames: 'chucho_dig',
        frameRate: 8,
        repeat: -1
    });

  }
}
