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

export class Cloud {
  constructor() {
    this.speedX = 3;
    this.speedY = 10;
    this.active = false;
    this.iterations = 0;
    this.height = 50;
    this.width = 150;
  }

  updatePosition() {
    if (!this.active) return;
    this.iterations++
    // this.updateSpeed(this.iterations)
    this.x -= this.speedX;
    this.y -= this.speedY;

    if (this.x < 0 || this.y < 0) this.initialize();
  }

  updateSpeed(steps) {
    this.speedY -= steps * 0.001
  }

  initialize() {
    this.x = Math.random() * (CANVAS_SIZE.width);
    this.y = CANVAS_SIZE.height + this.height;
    this.getDelay();
  }

  getDelay() {
    const delay = Math.random() * (6000);
    setTimeout(() => {
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

class Spaceship {
  constructor() {
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

  getNewSpeed() {
    this.speedX = Math.random() * (2 - (-2)) + (-2);
    this.speedY = Math.random() * (2 - (-2)) + (-2);
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
export const clouds = Array(10).fill(null).map(x => new Cloud().loadImage());
export const stars = Array(15).fill(null).map(x => new Star());