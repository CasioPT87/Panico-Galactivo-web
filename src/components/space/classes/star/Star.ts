import { update } from "react-spring";

export class Star {
  x: number;
  y: number;
  height: number;
  width: number;
  
  constructor(frameSize: any) {
    this.x = Math.random() * frameSize.width;
    this.y = Math.random() * frameSize.height;
    this.height = 5;
    this.width = 5;
  }
}

const starFactory: (qtty: number, frameSize: any) => Stars = (
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
