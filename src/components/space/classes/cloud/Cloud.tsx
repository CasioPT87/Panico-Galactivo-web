import { clouds, phaseManager } from "./../../Space";
import cloudImage from "../../../../assets/images/cloud.png";
export default class Cloud {

  static imagesUrl = [cloudImage];
  static images = [] as Array<HTMLImageElement>;

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
  delayTimeout: ReturnType<typeof setTimeout> | null;
  canvasSize: any;

  constructor(id: number, frameSize: any) {
    this.id = id;
    this.speedRatio = 4;
    this.speedY = 5;
    this.speedX = this.speedY / this.speedRatio;
    this.iterations = 0;
    this.iterationsToDie = 3;
    this.width = Math.min(frameSize.width / 7, 100);
    this.height = this.width / 3;

    this.x = Math.random() * frameSize.width;
    this.y = frameSize.height + this.height;
    this.active = false;
    this.delayTimeout = null;
    this.canvasSize = frameSize;
    setTimeout(() => this.active = true, Cloud.getDelay(3000))
  }

  updatePosition(): void {
    if (!this.active) return;
    this.x -= this.speedX;
    this.y -= this.speedY;

    if (this.x < 0 || this.y < 0) {
      if (this.shouldDestroy()) {
        this.destroy();
      } else {
        this.resetPosition();
      }
    }
  }

  resetPosition() {
    this.iterations++;
    this.x = Math.random() * this.canvasSize.width;
    this.y = this.canvasSize.height + this.height;
  }

  static getDelay(maxMilSec: number): number {
    return Math.random() * maxMilSec;
  }

  shouldDestroy() {
    return this.iterations >= this.iterationsToDie;
  }

  destroy() {
    const index = clouds.findIndex((cloud) => cloud.id === this.id);
    clouds.splice(index, 1);
    phaseManager.cloudDestroyed();
  }

  get image(): HTMLImageElement | void {
    return Cloud.images[0];
  }

  static createAllClouds(numberOfClouds: number, frameSize: any): Clouds {
    phaseManager.numberOfClouds = numberOfClouds;
    return cloudFactory(numberOfClouds, frameSize);
  }
}

export type Clouds = Array<Cloud>;

const cloudFactory: (qtty: number, frameSize: any) => Clouds = (
  qtty,
  frameSize
) => {
  return Array(qtty)
    .fill(null)
    .map((x, i) => {
      return new Cloud(i, frameSize);
    });
};
