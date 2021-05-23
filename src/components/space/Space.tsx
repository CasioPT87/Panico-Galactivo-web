import { useRef, useEffect } from "react";
import phaseManager from "../../assets/javascript/PhaseManager";
import spaceshipFactory, { Spaceship } from "./classes/spaceship/Spaceship";
// import drawSpaceShip from "./classes/spaceship/draw";
// import drawClouds from "./classes/cloud/draw";
import Cloud from "./classes/cloud/Cloud";
import starsFactory from "./classes/star/Star";
import drawStars from "./classes/star/draw";
import townFactory, { Town } from "./classes/town/Town";
// import drawTown from "./classes/town/draw";
import nameFactory, { Name } from "./classes/name/Name";
// import drawName from "./classes/name/draw";
import { drawEntities } from "../../assets/javascript/Utils";
import type { Clouds } from "./classes/cloud/Cloud";
import type { Stars } from "./classes/star/Star";
import styles from "./Space.module.css";

let spaceship: Spaceship | null = null;
let clouds: Clouds = [];
let stars: Stars = [];
let town: Town | null = null;
let name: Name | null = null;

const REFRESH_ANIMATION_SPEED_MS = 7;

const Space = ({ frameSize }: any): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    console.log('hola que tal')
    const setCanvasSize = () => {
      canvasRef.current.height = frameSize.height;
      canvasRef.current.width = frameSize.width;
    };
    const draw: () => void = () => {
      const ctx = canvasRef?.current?.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, frameSize.width, frameSize.height);
      ctx.save();
      drawEntities(ctx, [town, spaceship, ...clouds, name]);
      drawStars(ctx, stars);
      ctx.restore();
      setTimeout(draw, REFRESH_ANIMATION_SPEED_MS);
    };

    spaceship = spaceshipFactory(frameSize);
    clouds = Cloud.createAllClouds(6, frameSize);
    stars = starsFactory(15, frameSize);
    town = townFactory(frameSize);
    name = nameFactory(frameSize);
    phaseManager.action();
    setCanvasSize();
    draw();
    
  }, [frameSize]);

  useEffect(() => {
    return () => phaseManager.reset();
  }, []);

  return (
    <canvas
      id="initial-canvas"
      className={styles.canvas}
      ref={canvasRef}
      width={1000}
      height={1000}
    />
  );
};

export { phaseManager, clouds };
export default Space;
