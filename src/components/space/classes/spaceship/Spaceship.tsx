import { PhaseClass } from '../classes';
import { phaseManager } from './../../Space';
import spaceshipImage from '../../../../assets/images/spaceship.png';

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
  canvasSize: any;

  constructor(frameSize: any) {
    super();
    this.width = Math.min(frameSize.width / 5, 140);
    this.height = this.width / 2;
    this._x = frameSize.width / 2 - this.width / 2;
    this._y = frameSize.height / 2 - this.height / 2;
    this.x = this._x;
    this.y = this._y;
    this.speedX = 0;
    this.speedY = 0;
    this.active = false;
    this.image = null; 
    this.canvasSize = frameSize;
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
    if (phaseManager) {
      if (phaseManager.isPhase('approaching')) this.vibrate();
      if (phaseManager.isPhase('landing')) {
        this.land();
        if (this.hasLanded()) {
          phaseManager.setPhase('landed');
        }
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

const spaceshipFactory: (CANVAS_SIZE: any) => Spaceship = (CANVAS_SIZE) => {
  return new Spaceship(CANVAS_SIZE).loadImage();
}

export default spaceshipFactory;
