import { PhaseClass } from '../classes';
import { clouds, phaseManager } from './../../Space';
import cloudImage from '../../../../assets/images/cloud.png';
export default class Cloud extends PhaseClass {

  id: number;
  speedRatio: number;
  speedY: number;
  speedX: number;
  iterations: number;
  iterationsToDie: number;
  height: number;
  width: number;
  x: number;
  y: number;
  active: boolean;
  image: HTMLImageElement | null;
  delayTimeout: ReturnType<typeof setTimeout> | null;
  canvasSize: any;

  constructor(id: number, CANVAS_SIZE: any) {
    super();
    this.id = id;
    this.speedRatio = 3;
    this.speedY = 10;
    this.speedX = this.speedY / this.speedRatio;
    this.iterations = 0;
    this.iterationsToDie = 5;
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
      if (this.shouldDestroy()) {
        this.destroy();
      } else {
        this.resetPosition();
      }   
    }
  }

  resetPosition() {
    this.iterations++;
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

  shouldDestroy() {
    return this.iterations >= this.iterationsToDie;
  }

  destroy() {
    const index = clouds.findIndex(cloud => cloud.id === this.id);
    clouds.splice(index, 1);
    phaseManager.cloudDestroyed();
  }

  loadImage = () => {
    this.image = new Image();
    this.image.onload = () => {
      this.initialize()
    };
    this.image.src = cloudImage;
    return this;
  }

  static createAllClouds(numberOfClouds: number, CANVAS_SIZE: any): Clouds {
    phaseManager.numberOfClouds = numberOfClouds;
    return cloudFactory(numberOfClouds, CANVAS_SIZE);
  }
}

export type Clouds = Array<Cloud>;

const cloudFactory: (qtty: number, CANVAS_SIZE: any) => Clouds = (qtty, CANVAS_SIZE) => {
  return Array(qtty).fill(null).map((x, i) => {
    return new Cloud(i, CANVAS_SIZE).loadImage();
  });
};