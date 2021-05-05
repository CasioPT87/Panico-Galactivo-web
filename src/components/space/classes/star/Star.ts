import { CANVAS_SIZE } from '../classes';

export class Star {

  x: number;
  y: number;
  height: number;
  width: number;

  constructor() {
    this.x = Math.random() * (CANVAS_SIZE.width);
    this.y = Math.random() * (CANVAS_SIZE.height);
    this.height = 5;
    this.width = 5;
  }
}

const stars = Array(15).fill(null).map(x => new Star());

export default stars;