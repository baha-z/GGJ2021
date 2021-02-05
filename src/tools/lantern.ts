export class Lantern {
  private scene: Phaser.Scene;
  private remainingLight: number;
  private target: Phaser.Physics.Arcade.Sprite;
  private light: any;


  private MIN_LIGHT = 100;
  private MAX_LIGHT = 400;
  private LIGHT_HIGHT = 70;
  private AMBIENT_COLOR = 0x000000;
  private LIGHT_COLOR = 0xFFFFFF;

  constructor(scene: Phaser.Scene,
    target: Phaser.Physics.Arcade.Sprite) {
    this.scene = scene;
    this.target = target;
    this.remainingLight = this.MAX_LIGHT;
  }

  public charge() {
    this.remainingLight = Math.min(this.remainingLight + 10, this.MAX_LIGHT);
  }

  public turnOff() {
    this.scene.lights.destroy();
  }

  public turnOn() {
    this.target.setPipeline('Light2D');
    this.scene.lights.enable().setAmbientColor(this.AMBIENT_COLOR);
    this.light = this.scene.lights.addLight(this.target.x, (this.target.y + this.LIGHT_HIGHT), this.remainingLight);
    this.light.setColor(this.LIGHT_COLOR).setIntensity(3);
    this.scene.physics.add.overlap(this.light, this.target);
  }

  public use() {
    this.light.x = this.target.x;
    this.light.y = this.target.y + this.LIGHT_HIGHT;
    this.remainingLight = Math.max(this.remainingLight - 1, this.MIN_LIGHT);
    this.light.setRadius(this.remainingLight);
  }

}