import { PhaseClass } from '../classes';
import cloudImage from '../../../../assets/images/cloud.png';
export class Cloud extends PhaseClass {

  speedRatio: number;
  speedY: number;
  speedX: number;
  iterations: number;
  height: number;
  width: number;
  x: number;
  y: number;
  active: boolean;
  image: HTMLImageElement | null;
  delayTimeout: ReturnType<typeof setTimeout> | null;
  canvasSize: any;

  constructor(CANVAS_SIZE: any) {
    super();
    this.speedRatio = 3;
    this.speedY = 10;
    this.speedX = this.speedY / this.speedRatio;
    this.iterations = 0;
    this.height = 50;
    this.width = 150;
    this.x = Math.random() * (CANVAS_SIZE.width);
    this.y = CANVAS_SIZE.height + this.height;
    this.active = false;
    this.image = null;
    this.delayTimeout = null;
    this.canvasSize = CANVAS_SIZE;
  }

  updatePosition() {
    if (!this.active) return;
    
    this.x -= this.speedX;
    this.y -= this.speedY;

    if (this.x < 0 || this.y < 0){
      this.resetPosition();
    }
  }

  resetPosition() {
    this.x = Math.random() * (this.canvasSize.width);
    this.y = this.canvasSize.height + this.height;
  }

  initialize() {
    const delay = this.getDelay(3000);
    this.delayTimeout = setTimeout(() => {
      this.activate();
    }, delay);
  }

  getDelay(maxMilSec: number): number {
    return Math.random() * (maxMilSec);
  }

  activate(): void {
    this.active = true;
  }

  loadImage = () => {
    this.image = new Image();
    this.image.onload = () => {
      this.initialize()
    };
    this.image.src = cloudImage;
    return this;
  }
}

export type Clouds = Array<Cloud>;

const cloudFactory: (qtty: number, CANVAS_SIZE: any) => Clouds = (qtty, CANVAS_SIZE) => {
  return Array(qtty).fill(null).map(x => {
    return new Cloud(CANVAS_SIZE).loadImage();
  });
}

export default cloudFactory;