import { phaseManager } from "./../../Space";
import townImage from "../../../../assets/images/town.png";

export class Town {

  static imagesUrl = [townImage];
  static images = [] as Array<HTMLImageElement>;

  x: number;
  y: number;
  height: number;
  width: number;
  speedY: number;
  frameHeight: number;
  updates: boolean;
  active: boolean;

  constructor(id: number, frameSize: any) {
    this.x = 0;
    this.y = frameSize.height;
    this.height = Math.min(frameSize.height, frameSize.width) * 0.5;
    this.width = Math.max(frameSize.height * 2, frameSize.width);
    this.speedY = 0;
    this.frameHeight = frameSize.height;
    this.updates = true;
    this.active = true;
  }

  update(): void {
    if (phaseManager) {
      if (!this.hasRaised() && phaseManager.isPhase("landing")) {
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
    this.speedY = -3;
  }

  get image(): HTMLImageElement | void {
    return Town.images[0];
  }
}
