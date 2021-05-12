import { Name } from "./Name";

export default function (ctx: any, name: Name | null) {
  if (name && name.image) {
    ctx.save();
    ctx.translate(name.x, name.y);
    ctx.drawImage(name.image, 0, 0, name.width, name.height);
    ctx.restore();
  }
}
