import React, { useRef, useEffect } from 'react';
import { spaceship, clouds, stars, CANVAS_SIZE } from './classes/classes';
import styles from './Space.module.css';


const Space = props => {

  const canvasRef = useRef(null)

  useEffect(() => {
    draw();
    setTimeout(() => {
      clouds.forEach(cloud => cloud.setPhase(2));
    }, 6000);

    setTimeout(() => {
      spaceship.setPhase(2);
    }, 1000);
  });

  const draw = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height)
    stars.forEach((star) => {
      ctx.save();
      ctx.translate(star.x, star.y);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, star.width, star.height);
      ctx.restore();
    })
    ctx.save();
    if (spaceship.isPhase(1) || spaceship.isPhase(2) || spaceship.isPhase(3)) {
      spaceship.updatePosition();
      ctx.translate(spaceship.x, spaceship.y);
      ctx.drawImage(spaceship.image, 0, 0, spaceship.width, spaceship.height);
    }
    ctx.restore();
    clouds.forEach((cloud) => {
      cloud.updatePosition();
      ctx.save();
      ctx.translate(cloud.x, cloud.y);
      if (cloud.isPhase(1) || cloud.isPhase(2)) {
        ctx.drawImage(cloud.image, 0, 0, cloud.width, cloud.height);
      }
      ctx.restore();
    })
    setTimeout(draw, 20);
  }

  return (<canvas className={styles.canvas} ref={canvasRef} width={CANVAS_SIZE.width} height={CANVAS_SIZE.height}/>)
}

export default Space;