import type { Stars } from "./Star";

export default function (ctx: any, stars: Stars) {
  stars.forEach((star) => {
    ctx.save();
    ctx.translate(star.x, star.y);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, star.width, star.height);
    ctx.restore();
  });
}
