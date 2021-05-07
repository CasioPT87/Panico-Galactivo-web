import { PhaseClass } from '../classes';
import spaceshipImage from '../../../../assets/images/spaceship.png';
import type { PhaseManager } from '../../../../assets/javascript/PhaseManager';

export class Spaceship extends PhaseClass {

  height:number;
  width:number;
  _x:number;
  _y:number;
  x:number;
  y:number;
  speedX:number;
  speedY:number;
  active: boolean;
  image: HTMLImageElement | null;
  phases: PhaseManager | null;
  canvasSize: any;

  constructor(phases: PhaseManager, CANVAS_SIZE: any) {
    super();
    this.height = 60;
    this.width = 140;
    this._x = CANVAS_SIZE.width / 2 - this.width / 2;
    this._y = CANVAS_SIZE.height / 2 - this.height / 2;
    this.x = this._x;
    this.y = this._y;
    this.speedX = 0;
    this.speedY = 0;
    this.active = false;
    this.image = null; 
    this.phases = phases;
    this.canvasSize = CANVAS_SIZE;
  }

  vibrate() {
    this.getNewSpeed();
    this.x = this._x + this.speedX;
    this.y = this._y + this.speedY;
  }

  land() {
    this.setLandingSpeed();
    this.setLandingImage()
    this._x += this.speedX;
    this._y += this.speedY;
    this.x = this._x;
    this.y = this._y;
  }

  setLandingImage() {
    // TODO
  }

  hasLanded() {
    if (this.canvasSize.height <= 0) return false;
    return this.y + this.height >= this.canvasSize.height;
  }

  setLandingSpeed() {
    this.speedX = 0;
    this.speedY = 2;
  }

  updatePosition(): void {
    const { phases } = this;
    console.log(phases?.state.phase)
    if (phases) {
      if (phases.isPhase('approaching')) this.vibrate();
      if (phases.isPhase('landing')) this.land();
      if (this.hasLanded()) {
        phases.setPhase('landed');
      }
    }
  }

  getNewSpeed(range: number = 8): void {
    const min = -range / 2
    this.speedX = Math.random() * range + min;
    this.speedY = Math.random() * range + min;
  }

  loadImage = (): Spaceship => {
    this.image = new Image();
    this.image.onload = () => {
      //
    };
    this.image.src = spaceshipImage;
    return this;
  }
}

const spaceshipFactory: (phases: PhaseManager, CANVAS_SIZE: any) => Spaceship = (phases, CANVAS_SIZE) => {
  return new Spaceship(phases, CANVAS_SIZE).loadImage();
}

export default spaceshipFactory;
