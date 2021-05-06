import type { Clouds } from './Cloud';

export default function(ctx: any, clouds: Clouds) {
  const { items, phases } = clouds;
  items.forEach((item) => {
    item.updatePosition();
    ctx.save();
    ctx.translate(item.x, item.y);
    if ((item.isPhase(1) || item.isPhase(2)) && !!item.image) {
      ctx.drawImage(item.image, 0, 0, item.width, item.height);
    }
    ctx.restore();
  })
};