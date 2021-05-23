import ImageManager, { SimpleImageLoader } from "./ImageManager"
import Cloud from "../../components/space/classes/cloud/Cloud";
import { Spaceship } from "../../components/space/classes/spaceship/Spaceship";
import { Town } from "../../components/space/classes/town/Town";
import { Name } from "../../components/space/classes/name/Name";

export type ImageData = {
  name: string,
  url: string
}

export type DrawingImageClasses = typeof Cloud | typeof Spaceship | typeof Town | typeof Name;

export type Loader = SimpleImageLoader | ImageManager;
export type LoaderType = typeof SimpleImageLoader | typeof ImageManager;