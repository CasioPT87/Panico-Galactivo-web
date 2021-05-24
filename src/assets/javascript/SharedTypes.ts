import Cloud from "../../components/space/classes/cloud/Cloud";
import { Spaceship } from "../../components/space/classes/spaceship/Spaceship";
import { Town } from "../../components/space/classes/town/Town";
import { Name } from "../../components/space/classes/name/Name";

import { SimpleImageLoader } from "./ImageManager"

export type ImageData = {
  name: string,
  url: string
}

export type DrawEntity = Cloud | Spaceship | Town | Name | null;
export type DrawEntityType = typeof Cloud | typeof Spaceship | typeof Town | typeof Name;

export type Loader = SimpleImageLoader;
export type LoaderType = typeof SimpleImageLoader;

export type FrameSize = {
  height: number,
  width: number
}