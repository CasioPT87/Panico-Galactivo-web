import { Town } from "./Town";

export default function (ctx: any, town: Town | null) {
  if (town && !!town.image) {
    town.updatePosition();
    ctx.save();
    const grd = ctx.createLinearGradient(0, town.height, 0, 0);
    grd.addColorStop(0, "white");
    grd.addColorStop(1, "black");
    ctx.fillStyle = grd;
    ctx.translate(town.x, town.y);
    ctx.fillRect(0, 0, town.width, town.height);
    ctx.drawImage(town.image, 0, 0, town.width, town.height);
    ctx.restore();
  }
}
