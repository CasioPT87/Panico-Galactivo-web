import { ImageData, DrawEntity } from "./SharedTypes";

export function findImageDataByName(imagesData: Array<ImageData>, name: string): string | undefined {
  const data = imagesData.find(data => data.name === name);
  if (data?.url) return data.url;
  return undefined;
}

function draw(ctx: any, entity: DrawEntity): void {
  if (entity === null || !entity.image) return;
  if (entity.updates) entity.update();
  ctx.save();
  ctx.translate(entity.x, entity.y);
  ctx.drawImage(entity.image, 0, 0, entity.width, entity.height);
  ctx.restore();
}

export function drawEntities(ctx: any, entities: Array<DrawEntity>) {
  entities.forEach(entity => {
    if(entity === null) return; 
    draw(ctx, entity);
  })
}