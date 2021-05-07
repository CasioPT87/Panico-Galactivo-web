import { useRef, useEffect } from 'react';
import phaseManager from '../../assets/javascript/PhaseManager';
import spaceshipFactory, { Spaceship } from './classes/spaceship/Spaceship';
import drawSpaceShip from './classes/spaceship/draw';
import drawClouds from './classes/cloud/draw';
import cloudsFactory from './classes/cloud/Cloud';
import starsFactory from './classes/star/Star';
import drawStars from './classes/star/draw';
import type { Clouds } from './classes/cloud/Cloud';
import type { Stars } from './classes/star/Star';
import styles from './Space.module.css';


const Space = ({ frameSize }: any): JSX.Element => {

  const canvasRef = useRef<HTMLCanvasElement>(null!);

  let spaceship: Spaceship | null = null;
  let clouds: Clouds = [];
  let stars: Stars = [];
 

  useEffect(() => {
    if (frameSize) {
      createItems();
      phaseManager.action();
      draw();
    }
  });

  const createItems = (): void => {
    spaceship = spaceshipFactory(phaseManager, frameSize);
    clouds = cloudsFactory(1, phaseManager, frameSize);
    stars = starsFactory(1, frameSize);
  }

  const draw: () => void = () => {
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, frameSize.width, frameSize.height);
    ctx.save();
    drawStars(ctx, stars);
    drawSpaceShip(ctx, spaceship);
    drawClouds(ctx, clouds);
    ctx.restore();
    setTimeout(draw, 20);
  }

  return (<canvas id="initial-canvas" className={styles.canvas} ref={canvasRef} width={1000} height={1000}/>)
}

export default Space;