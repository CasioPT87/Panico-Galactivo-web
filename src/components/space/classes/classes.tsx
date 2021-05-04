import cloudImage from '../../../assets/images/cloud.png';

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

export class PhaseClass {
  phase: number | null;

  constructor() {
    this.phase = null;
  }

  setPhase(phase: number): PhaseClass {
    this.phase = phase;
    return this;
  }

  isPhase(phase: number): boolean {
    return phase === this.phase;
  }
}

export class Cloud extends PhaseClass {

  id: number;
  speedRatio: number;
  speedY: number;
  speedX: number;
  iterations: number;
  height: number;
  width: number;
  x: number;
  y: number;
  active: boolean;
  image: HTMLImageElement | null;
  delayTimeout: ReturnType<typeof setTimeout> | null;

  constructor(id: number) {
    super();
    this.id = id;
    this.speedRatio = 3;
    this.speedY = 10;
    this.speedX = this.speedY / this.speedRatio;
    this.iterations = 0;
    this.height = 50;
    this.width = 150;
    this.x = Math.random() * (CANVAS_SIZE.width);
    this.y = CANVAS_SIZE.height + this.height;
    this.active = false;
    this.image = null;
    this.delayTimeout = null;
  }

  updatePosition() {
    if(this.isPhase(0) || this.isPhase(3)) return;
    this.x -= this.speedX;
    this.y -= this.speedY;

    if (this.x < 0 || this.y < 0){
      if(this.isPhase(1)) this.initialize();
      if(this.isPhase(2)) {
        this.setPhase(3);
        if (this.delayTimeout) clearTimeout(this.delayTimeout);
      } 
    } 
  }

  resetPosition() {
    this.x = Math.random() * (CANVAS_SIZE.width);
    this.y = CANVAS_SIZE.height + this.height;
  }

  initialize() {
    this.resetPosition();
    if (this.isPhase(0)) this.getDelay();
  }

  getDelay() {
    const delay = Math.random() * (3000);
    this.delayTimeout = setTimeout(() => {
      this.setPhase(1);
    }, delay);
  }

  loadImage = () => {
    this.image = new Image();
    this.image.onload = () => {
      this.initialize()
    };
    this.image.src = cloudImage;
    return this;
  }

  destroy() {
    this.active = false;
  }

  isActive() {
    return this.active;
  }
}

export let clouds = Array(10).fill(null)
  .map((x, i) => new Cloud(i).loadImage().setPhase(0));
export const stars = Array(15).fill(null).map(x => new Star());