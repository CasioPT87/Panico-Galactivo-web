import { ImageData, DrawEntity } from "./SharedTypes";

export function findImageDataByName(imagesData: Array<ImageData>, name: string): string | undefined {
  const data = imagesData.find(data => data.name === name);
  if (data?.url) return data.url;
  return undefined;
}

export function draw(ctx: any, entity: DrawEntity, hasImage: boolean = true,  updates: boolean = true): void {
  if (!hasImage) {
    drawContext(ctx, entity);
  } else if (!!entity.image) {
    if (entity) entity.update();
    drawContext(ctx, entity);
  }
}

const drawContext = (ctx: any, entity: DrawEntity ): void => {
  ctx.updatePosition();
  ctx.save();
  ctx.translate(entity.x, entity.y);
  ctx.drawImage(entity.image, 0, 0, entity.width, entity.height);
  ctx.restore();
}

