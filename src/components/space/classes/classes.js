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
    return this;
  }

  isPhase(phase) {
    return phase === this.phase;
  }
}

export class Cloud extends PhaseClass {
  constructor(id) {
    super();
    this.id = id;
    this.speedRatio = 3;
    this.speedY = 10;
    this.speedX = this.speedY / this.speedRatio;
    this.iterations = 0;
    this.height = 50;
    this.width = 150;
    this.phase = null;
  }

  updatePosition() {
    if(this.isPhase(0) || this.isPhase(3)) return;
    this.x -= this.speedX;
    this.y -= this.speedY;

    if (this.x < 0 || this.y < 0){
      if(this.isPhase(1)) this.initialize();
      if(this.isPhase(2)) {
        this.setPhase(3);
        clearTimeout(this.delayTimeout)
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

class Spaceship extends PhaseClass {
  constructor() {
    super();
    this.height = 60;
    this.width = 140;
    this._x = CANVAS_SIZE.width / 2 - this.width / 2;
    this._y = CANVAS_SIZE.height / 2 - this.height / 2;
    this.x = this._x;
    this.y = this._y;
    this.speedX = 0;
    this.speedY = 0;
    this.active = false;
    
  }

  initialize() {
    this.setPhase(1);
  }

  vibrate() {
    this.getNewSpeed();
    this.x = this._x + this.speedX;
    this.y = this._y + this.speedY;
  }

  land() {
    this.setLandingSpeed();
    this.setLandingImage()
    this._x += this.speedX;
    this._y += this.speedY;
    this.x = this._x;
    this.y = this._y;
    if (this.hasLanded()) {
      this.setPhase(3);
    }
  }

  setLandingImage() {
    // TODO
  }

  hasLanded() {
    return this.y + this.height >= CANVAS_SIZE.height;
  }

  setLandingSpeed() {
    this.speedX = 2;
    this.speedY = 5;
  }

  updatePosition() {
    console.log(this.phase)
    if (this.isPhase(1)) this.vibrate();
    if (this.isPhase(2)) this.land();
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

export const spaceship = new Spaceship().loadImage().setPhase(0);
export let clouds = Array(10).fill(null)
  .map((x, i) => new Cloud(i).loadImage().setPhase(0));
export const stars = Array(15).fill(null).map(x => new Star());