import { phaseManager } from './../../Space';
import townImage from '../../../../assets/images/town.png';

export class Town {

  x: number;
  y: number;
  height: number;
  width: number;
  speedY: number;
  image: HTMLImageElement | null;
  frameHeight: number;

  constructor(frameSize: any) {
    this.x = 0;
    this.y = frameSize.height;
    this.height = frameSize.height / 4;
    this.width = this.height * 8;
    this.speedY = 0;
    this.image = null;
    this.frameHeight = frameSize.height;
  }

  updatePosition(): void {
    if (phaseManager) {
      if (!this.hasRaised() &&
      phaseManager.isPhase('landing')) {
        this.raise();
      }
    }
  }

  raise() {
    this.setLandingSpeed();
    this.y += this.speedY;
  }

  hasRaised() {
    return this.y + this.height <= this.frameHeight;
  }

  setLandingSpeed() {
    this.speedY = -2;
  }

  loadImage = (): Town => {
    this.image = new Image();
    this.image.onload = () => {
      //
    };
    this.image.src = townImage;
    return this;
  }
}

const townFactory: (CANVAS_SIZE: any) => Town = (CANVAS_SIZE) => {
  return new Town(CANVAS_SIZE).loadImage();
}

export default townFactory;