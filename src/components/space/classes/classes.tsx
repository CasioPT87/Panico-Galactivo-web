const WINDOW = {
  heigth: window.innerHeight,
  width: window.innerWidth
}

export const CANVAS_SIZE = {
  height: WINDOW.heigth,
  width: WINDOW.width
}

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

export abstract class PhaseClass {
  phase: number | null;

  constructor() {
    this.phase = null;
  }

  setPhase(phase: number): this {
    this.phase = phase;
    return this;
  }

  isPhase(phase: number): boolean {
    return phase === this.phase;
  }
}

export const stars = Array(15).fill(null).map(x => new Star());