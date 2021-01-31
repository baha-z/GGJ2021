export class Lantern {
  private scene: Phaser.Scene;
  private remainingLight: number;
  private target: Phaser.Physics.Arcade.Sprite;
  private light: any;


  private MIN_LIGHT = 100;
  private MAX_LIGHT = 400;

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
    this.scene.lights.enable().setAmbientColor(0x000000);
    this.light = this.scene.lights.addLight(this.target.x, this.target.y, this.remainingLight);
    let circle = new Phaser.Geom.Circle(this.light.x, this.light.y, this.remainingLight);
    this.scene.time.addEvent({
      delay: 1000,
      callback: function () {
        Phaser.Geom.Circle.Random(circle, this.light);
      }
    });
  }

  public use() {
    this.remainingLight = Math.max(this.remainingLight - 1, this.MIN_LIGHT);
    this.light.setRadius(this.remainingLight);
  }

}