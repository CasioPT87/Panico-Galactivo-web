import React, { useRef, useEffect } from 'react';
import cloudImage from '../../assets/images/cloud.png';
import spaceshipImage from '../../assets/images/spaceship.png';
import styles from './Space.module.css';

const WINDOW = {
  heigth: window.innerHeight,
  width: window.innerWidth
}

const CANVAS_SIZE = {
  height: WINDOW.heigth,
  width: WINDOW.width
}

const STAR_SIZE = {
  height: 5,
  width: 5
}
class Star {
  constructor() {
    this.x = Math.random() * (CANVAS_SIZE.width);
    this.y = Math.random() * (CANVAS_SIZE.height);
  }
}

const CLOUD_SIZE = {
  height: 50,
  width: 150
}
class Cloud {
  constructor() {
    this.speedX = 3;
    this.speedY = 10;
    this.active = false;
    this.iterations = 0;
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
    this.y = CANVAS_SIZE.height + CLOUD_SIZE.height;
    this.getDelay();
  }

  getDelay() {
    const delay = Math.random() * (6000);
    setTimeout(() => {
      this.active = true;
    }, delay);
  }
}

const SHIP_SIZE = {
  height: 60,
  width: 140
}

class Spaceship {
  constructor() {
    this.x = CANVAS_SIZE.width / 2;
    this.y = CANVAS_SIZE.height / 2;
    this.speedX = 0;
    this.speedY = 0;
    this.active = false;
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
}

const Space = props => {

  let spaceship = new Spaceship();
  spaceship.image = new Image();
  spaceship.image.onload = function() {
    spaceship.initialize()
  };
  spaceship.image.src = spaceshipImage;
  spaceship.image.height = SHIP_SIZE.height;
  spaceship.image.width = SHIP_SIZE.width;
  
  let clouds = Array(10).fill(null).map(x => {
    const cloud = new Cloud();
    cloud.image = new Image();

    cloud.image.onload = function() {
      cloud.initialize()
    };
    cloud.image.src = cloudImage;
    cloud.image.height = CLOUD_SIZE.height;
    cloud.image.width = CLOUD_SIZE.width;
    
    return cloud;
  });

  let stars = Array(15).fill(null).map(x => {
    return new Star();
  });

  const canvasRef = useRef(null)
  
  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   const context = canvas.getContext('2d')
  //   //Our first draw
  //   context.fillStyle = '#000000'
  //   context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  // }, [])



  useEffect(() => {
    draw()
  });

  const draw = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height)
    ctx.save();
    if (spaceship.active) {
      spaceship.getNewSpeed();
      spaceship.updatePosition();
      ctx.translate(spaceship.x, spaceship.y);
      ctx.drawImage(spaceship.image, 0, 0, SHIP_SIZE.width, SHIP_SIZE.height);
    }
    ctx.restore();
    clouds.forEach((cloud, i) => {
      cloud.updatePosition();
      ctx.save();
      ctx.translate(cloud.x, cloud.y);
      ctx.drawImage(cloud.image, 0, 0, CLOUD_SIZE.width, CLOUD_SIZE.height);
      ctx.restore();
    })
    stars.forEach((star, i) => {
      ctx.save();
      ctx.translate(star.x, star.y);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, STAR_SIZE.width, STAR_SIZE.height);
      ctx.restore();
    })
    setTimeout(draw, 20);
  }

  return (<canvas className={styles.canvas} ref={canvasRef} width={CANVAS_SIZE.width} height={CANVAS_SIZE.height}/>)
}

export default Space;