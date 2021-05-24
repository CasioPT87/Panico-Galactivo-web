import { FrameSize } from "../../../../assets/javascript/SharedTypes";

export class Star {
  x: number;
  y: number;
  height: number;
  width: number;
  
  constructor(frameSize: FrameSize) {
    this.x = Math.random() * frameSize.width;
    this.y = Math.random() * frameSize.height;
    this.height = 5;
    this.width = 5;
  }
}

const starFactory: (qtty: number, frameSize: FrameSize) => Stars = (
  qtty,
  frameSize
) => {
  return Array(qtty)
    .fill(null)
    .map((x) => {
      return new Star(frameSize);
    });
};

export type Stars = Array<Star>;
export default starFactory;
