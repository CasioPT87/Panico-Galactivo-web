import cloudImage from '../../../assets/images/cloud.png';
import spaceshipImage from '../../../assets/images/spaceship.png';

const WINDOW = {
  heigth: window.innerHeight,
  width: window.innerWidth
}

export const CANVAS_SIZE = {
  height: WINDOW.heigth,
  width: WINDOW.width
}

export class Star {
  constructor() {
    this.x = Math.random() * (CANVAS_SIZE.width);
    this.y = Math.random() * (CANVAS_SIZE.height);
    this.height = 5;
    this.width = 5;
  }
}

class PhaseClass {
  phase = null;

  setPhase(phase) {
    this.phase = phase;
  }

  isPhase(phase) {
    return this.phase === phase;
  }
}

export class Cloud extends PhaseClass {
  constructor(id) {
    super();
    this.id = id;
    this.speedY = 10;
    this.speedX = this.speedY / 3;
    this.active = false;
    this.iterations = 0;
    this.height = 50;
    this.width = 150;
  }

  updatePosition() {
    this.updateSpeed();
    if (!this.active) return;
    this.x -= this.speedX;
    this.y -= this.speedY;

    if (this.isPhase(1) || this.x < 0 || this.y < 0) this.initialize();
  }

  updateSpeed() {
    if (this.isPhase(1)) {
      this.iterations++
      this.speedY -= this.iterations * 0.0001;
      if (this.speedY < 2) {
        this.speedY = 2;
        this.setPhase(2);
      } 
      this.speedX = this.speedY / 3;
    }   
  }

  initialize() {
    this.x = Math.random() * (CANVAS_SIZE.width);
    this.y = CANVAS_SIZE.height + this.height;
    if (this.id == 1)console.log(this.y)
    this.getDelay();
  }

  getDelay() {
    const delay = Math.random() * (6000);
    setTimeout(() => {
      this.setPhase(1);
      this.active = true;
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
}

class Spaceship extends PhaseClass {
  constructor() {
    super();
    this.x = CANVAS_SIZE.width / 2;
    this.y = CANVAS_SIZE.height / 2;
    this.speedX = 0;
    this.speedY = 0;
    this.active = false;
    this.height = 60;
    this.width = 140;
  }

  initialize() {
    this.active = true;
  }

  updatePosition() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  getNewSpeed(range = 8) {
    const min = -range / 2
    this.speedX = Math.random() * range + min;
    this.speedY = Math.random() * range + min;
  }

  loadImage = () => {
    this.image = new Image();
    this.image.onload = () => {
      this.initialize()
    };
    this.image.src = spaceshipImage;
    return this;
  }
}

export const spaceship = new Spaceship().loadImage();
export const clouds = Array(10).fill(null).map((x, i) => new Cloud(i).loadImage());
export const stars = Array(15).fill(null).map(x => new Star());