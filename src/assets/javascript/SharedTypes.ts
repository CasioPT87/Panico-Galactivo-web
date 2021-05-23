import Cloud from "../../components/space/classes/cloud/Cloud";
import { Spaceship } from "../../components/space/classes/spaceship/Spaceship";
import { Town } from "../../components/space/classes/town/Town";
import { Name } from "../../components/space/classes/name/Name";
import { Star } from "../../components/space/classes/star/Star";


import { SimpleImageLoader } from "./ImageManager"

export type ImageData = {
  name: string,
  url: string
}

export type DrawEntity = Cloud | Spaceship | Town | Name | null;

export type Loader = SimpleImageLoader;
export type LoaderType = typeof SimpleImageLoader;