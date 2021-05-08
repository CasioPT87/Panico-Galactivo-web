import { Town } from './Town';

export default function(ctx: any, town: Town | null) {
  if (town && !!town.image) {
    town.updatePosition();
    ctx.save();
    // ctx.globalAlpha = 0.05;
    ctx.translate(town.x, town.y);
    ctx.drawImage(town.image, 0, 0, town.width, town.height);
    ctx.restore();
  }
}