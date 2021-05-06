import type { SpaceshipType } from './Spaceship';

export default function(ctx: any, spaceship: SpaceshipType) {
  const { item } = spaceship;
  if (!!item.image) {
    item.updatePosition();
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.drawImage(item.image, 0, 0, item.width, item.height);
    ctx.restore();
  }
}