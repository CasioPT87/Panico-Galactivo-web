import { useRef, useEffect } from 'react';
import { CANVAS_SIZE } from './classes/classes';
import phaseManager from '../../assets/javascript/PhaseManager';
import spaceship from './classes/spaceship/Spaceship';
import drawSpaceShip from './classes/spaceship/draw';
import drawClouds from './classes/cloud/draw';
import clouds from './classes/cloud/Cloud';
import stars from './classes/star/Star';
import drawStars from './classes/star/draw';
import styles from './Space.module.css';

const Space = (): JSX.Element => {

  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const cloudItems = clouds.items;

  useEffect(() => {
    attachPhaseManager()
    phaseManager.action();
    draw();
    // setTimeout(() => {
    //   cloudItems.forEach(cloud => cloud.setPhase(2));
    // }, 6000);

    // setTimeout(() => {
    //   spaceship.setPhase(2);
    // }, 10000);

    // setInterval(() => {
    //   console.log(phaseManager.state)
    // }, 1000)
  });

  const attachPhaseManager = () => {
    clouds.phases = phaseManager;
    spaceship.phases = phaseManager;
  }

  const draw: () => void = () => {
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
    ctx.save();
    drawStars(ctx, stars);
    drawSpaceShip(ctx, spaceship);
    drawClouds(ctx, clouds);
    ctx.restore();
    setTimeout(draw, 20);
  }

  return (<canvas className={styles.canvas} ref={canvasRef} width={CANVAS_SIZE.width} height={CANVAS_SIZE.height}/>)
}

export default Space;