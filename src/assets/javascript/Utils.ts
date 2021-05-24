import { ImageData, DrawEntity, DrawEntityType } from "./SharedTypes";
import { FrameSize } from "./SharedTypes";

export function findImageDataByName(imagesData: Array<ImageData>, name: string): string | undefined {
  const data = imagesData.find(data => data.name === name);
  if (data?.url) return data.url;
  return undefined;
}

function draw(ctx: CanvasRenderingContext2D, entity: DrawEntity): void {
  if (entity === null || !entity.image || !entity.active) return;
  if (entity.updates) entity.update();
  ctx.save();
  if (!entity.image) debugger
  ctx.translate(entity.x, entity.y);
  ctx.drawImage(entity.image, 0, 0, entity.width, entity.height);
  ctx.restore();
}

export function drawEntities(ctx: CanvasRenderingContext2D, entities: Array<DrawEntity>) {
  entities.forEach(entity => {
    if(entity === null) return; 
    draw(ctx, entity);
  })
}

type FactoryParams = Array<{
  number: number,
  macroClass: DrawEntityType,
  callback?: () => void
}>

export function instancesFactory(entitiesData: FactoryParams, frameSize: FrameSize): Array<DrawEntity> {
  let instances: Array<DrawEntity> = [];
  entitiesData.forEach((entityData) => {
    const { number } = entityData;
    if (number < 1) return; 
    Array(number).fill(null).forEach((x, i) => {
      const instance: DrawEntity = new entityData.macroClass(i, frameSize);
      instances.push(instance);
    })
    if (entityData.callback) entityData.callback();
  });
  return instances;
}