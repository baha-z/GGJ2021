export class EnergyText {
  private scene: Phaser.Scene;
  private remainingEnergy: number;
  private target: Phaser.Physics.Arcade.Sprite;
  private text: Phaser.GameObjects.Text;


  private MIN_ENERGY = 0;
  private MAX_ENERGY = 1000;
  private SEPARATION_FACTOR = 30;

  constructor(scene: Phaser.Scene,
    target: Phaser.Physics.Arcade.Sprite) {
    this.scene = scene;
    this.target = target;
    this.remainingEnergy = this.MAX_ENERGY;
  }

  public drawn() {
    this.text = this.scene.add.text(10, this.target.y - this.SEPARATION_FACTOR, this.makeText(), { font: '24px Courier', color: '#FFF' });
  }

  public recharge() {
    this.remainingEnergy += 100;
    this.remainingEnergy = Math.min(this.remainingEnergy, this.MAX_ENERGY);
    this.text.setText(this.makeText());
  }

  public refresh() {
    this.text.y = this.target.y - this.SEPARATION_FACTOR;
    this.remainingEnergy -= 3;
    this.remainingEnergy = Math.max(this.remainingEnergy, this.MIN_ENERGY);
    this.text.setText(this.makeText());
  }

  private makeText(): string {
    return 'Energía restante: ' + Math.round(this.remainingEnergy / 10) + '%';
  }
}