import { phaseManager } from "./../../Space";
import cloudImage from "../../../../assets/images/cloud.png";
import { FrameSize } from "../../../../assets/javascript/SharedTypes";
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
  canvasSize: FrameSize;
  updates: boolean;

  constructor(id: number, frameSize: FrameSize) {
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
    this.updates = true;
    setTimeout(() => this.active = true, Cloud.getDelay(3000))
  }

  update(): void {
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
    this.active = false;
    phaseManager.cloudDestroyed();
  }

  get image(): HTMLImageElement | void {
    return Cloud.images[0];
  }
}

export type Clouds = Array<Cloud>;
