import type { Clouds } from "./Cloud";

export default function (ctx: any, clouds: Clouds) {
  clouds.forEach((cloud) => {
    cloud.updatePosition();
    ctx.save();
    ctx.translate(cloud.x, cloud.y);
    ctx.drawImage(cloud.image, 0, 0, cloud.width, cloud.height);
    ctx.restore();
  });
}
