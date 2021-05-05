const WINDOW = {
  heigth: window.innerHeight,
  width: window.innerWidth
}

export const CANVAS_SIZE = {
  height: WINDOW.heigth,
  width: WINDOW.width
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