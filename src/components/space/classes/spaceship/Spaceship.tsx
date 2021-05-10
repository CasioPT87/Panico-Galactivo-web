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
    this.width = Math.min(frameSize.width / 5, 150);
    this.height = this.width * 0.8;
    this._x = - this.width;
    this._y = - this.height;
    this.x = this._x;
    this.y = this._y;
    this.speedX = 0;
    this.speedY = 0;
    this.active = false;
    this.image = null; 
    this.canvasSize = frameSize;
  }

  positioning() {
    const goalCX = this.canvasSize.width / 2 - this.width / 2;
    const goalCY = this.canvasSize.height / 2 - this.height / 2;
    const directionX = goalCX - this.x;
    const directionY = goalCY - this.y;
    const angle = Math.atan2(directionX, directionY);
    this.speedX = Math.sin(angle) * 3;
    this.speedY = Math.cos(angle) * 3;
    this._x += this.speedX;
    this._y += this.speedY;
    this.x = this._x;
    this.y = this._y;
  }

  vibrate() {
    this.getNewSpeed();
    this.x = this._x + this.speedX;
    this.y = this._y + this.speedY;
  }

  land() {
    this.setLandingSpeed();
    this._x += this.speedX;
    this._y += this.speedY;
    this.x = this._x;
    this.y = this._y;
  }

  hasPositioned() {
    if (this.canvasSize.height <= 0) return false;
    return this.y + (this.height / 2) >= this.canvasSize.height / 2;
  }

  hasLanded() {
    if (this.canvasSize.height <= 0) return false;
    return this.y + this.height >= this.canvasSize.height;
  }

  setLandingSpeed() {
    this.speedX = 0;
    this.speedY = 1;
  }

  updatePosition(): void {
    if (phaseManager) {
      if (phaseManager.isPhase('initial')) {
        console.log(this.hasPositioned())
        this.positioning();
        if (this.hasPositioned()) phaseManager.setPhase('approaching');
      } 
      if (phaseManager.isPhase('approaching')) this.vibrate();
      if (phaseManager.isPhase('landing')) {
        this.land();
        if (this.hasLanded()) {
          phaseManager.setPhase('landed');
        }
      }
    }
  }

  getNewSpeed(range: number = 4): void {
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
