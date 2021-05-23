import ImageManager, { SimpleImageLoader } from "./ImageManager"

export type ImageData = {
  name: string,
  url: string
}

export type Loader = SimpleImageLoader;
export type LoaderType = typeof SimpleImageLoader;