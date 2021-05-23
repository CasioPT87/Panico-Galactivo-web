import { phaseManager } from "./../../Space";
import spaceshipImage from "../../../../assets/images/spaceship.png";

export class Spaceship {

  static imagesUrl = [spaceshipImage];
  static images = [] as Array<HTMLImageElement>;

  height: number;
  width: number;
  _x: number;
  _y: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  active: boolean;
  canvasSize: any;
  updates: boolean;

  constructor(id: number, frameSize: any) {
    this.width = Math.min(frameSize.width / 5, 150);
    this.height = this.width * 0.8;
    this._x = -this.width;
    this._y = -this.height;
    this.x = this._x;
    this.y = this._y;
    this.speedX = 0;
    this.speedY = 0;
    this.active = true;
    this.canvasSize = frameSize;
    this.updates = true;
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
    return this.y + this.height / 2 >= this.canvasSize.height / 2;
  }

  hasLanded() {
    if (this.canvasSize.height <= 0) return false;
    return this.y + this.height >= this.canvasSize.height;
  }

  setLandingSpeed() {
    this.speedX = 0;
    this.speedY = 1;
  }

  update(): void {
    if (phaseManager) {
      if (phaseManager.isPhase("initial")) {
        this.positioning();
        if (this.hasPositioned()) phaseManager.setPhase("approaching");
      }
      if (phaseManager.isPhase("approaching")) this.vibrate();
      if (phaseManager.isPhase("landing")) {
        this.land();
        if (this.hasLanded()) {
          phaseManager.setPhase("landed");
        }
      }
    }
  }

  getNewSpeed(range: number = 4): void {
    const min = -range / 2;
    this.speedX = Math.random() * range + min;
    this.speedY = Math.random() * range + min;
  }

  get image(): HTMLImageElement | void {
    return Spaceship.images[0];
  }
}
