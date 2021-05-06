import { Spaceship } from './Spaceship';

export default function(ctx: any, spaceship: Spaceship) {
  if (!!spaceship.image) {
    spaceship.updatePosition();
    ctx.save();
    ctx.translate(spaceship.x, spaceship.y);
    ctx.drawImage(spaceship.image, 0, 0, spaceship.width, spaceship.height);
    ctx.restore();
  }
}