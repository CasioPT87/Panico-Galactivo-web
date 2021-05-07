export class Star {

  x: number;
  y: number;
  height: number;
  width: number;

  constructor(CANVAS_SIZE: any) {
    this.x = Math.random() * (CANVAS_SIZE.width);
    this.y = Math.random() * (CANVAS_SIZE.height);
    this.height = 5;
    this.width = 5;
  }
}

const starFactory: (qtty: number, CANVAS_SIZE: any) => Stars = (qtty, CANVAS_SIZE) => {
  return Array(qtty).fill(null).map(x => {
    return new Star(CANVAS_SIZE);  
  });
}

export type Stars = Array<Star>;
export default starFactory;