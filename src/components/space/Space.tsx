import { useRef, useEffect } from "react";
import phaseManager from "../../assets/javascript/PhaseManager";
import { Spaceship } from "./classes/spaceship/Spaceship";
import Cloud from "./classes/cloud/Cloud";
import starsFactory from "./classes/star/Star";
import drawStars from "./classes/star/draw";
import { Town } from "./classes/town/Town";
import { Name } from "./classes/name/Name";
import { drawEntities, instancesFactory } from "../../assets/javascript/Utils";
import type { Stars } from "./classes/star/Star";
import { DrawEntity } from "../../assets/javascript/SharedTypes";
import styles from "./Space.module.css";

let drawingInstances: Array<DrawEntity> = [];
let stars: Stars = [];

const REFRESH_ANIMATION_SPEED_MS = 7;

const Space = ({ frameSize }: any): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    const setCanvasSize = () => {
      canvasRef.current.height = frameSize.height;
      canvasRef.current.width = frameSize.width;
    };
    const draw: () => void = () => {
      const ctx = canvasRef?.current?.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, frameSize.width, frameSize.height);
      ctx.save();
      drawEntities(ctx, drawingInstances);
      drawStars(ctx, stars);
      ctx.restore();
      setTimeout(draw, REFRESH_ANIMATION_SPEED_MS);
    };

    drawingInstances = instancesFactory(
    [
      { number: 1, macroClass: Spaceship },
      { number: 6, macroClass: Cloud },
      { number: 1, macroClass: Town },
      { number: 1, macroClass: Name }
    ], 
      frameSize
    );
    stars = starsFactory(15, frameSize);
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

export { phaseManager };
export default Space;
