import { ImageData } from "./SharedTypes";

export function findImageDataByName(imagesData: Array<ImageData>, name: string): string | undefined {
  const data = imagesData.find(data => data.name === name);
  if (data?.url) return data.url;
  return undefined;
}