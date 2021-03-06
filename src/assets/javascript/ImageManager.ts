import Cloud from '../../components/space/classes/cloud/Cloud';
import { Spaceship } from '../../components/space/classes/spaceship/Spaceship';
import { Town } from '../../components/space/classes/town/Town';
import { Name } from '../../components/space/classes/name/Name';

type ValidClass = typeof Cloud | typeof Spaceship | typeof Town | typeof Name;
type SimpleImageData = {
  name: string,
  url: string
}
type SimpleLoadedImages = {
  [index: string]: HTMLImageElement
}
export class SimpleImageLoader {
  imagesData: Array<SimpleImageData>;
  numImages: number;
  imagesLoaded: number;
  images: SimpleLoadedImages;
  callback: () => any;

  constructor(imagesData: Array<SimpleImageData>, callback: () => any) {
    this.imagesData = imagesData;
    this.numImages = imagesData.length;
    this.imagesLoaded = 0;
    this.images = {};
    this.callback = callback;
  }

  loadImages(): this {
    this.imagesData.forEach((imageData: SimpleImageData) => this.loadImage(imageData));
    return this;
  }

  loadImage(imageData: SimpleImageData) {
    const image = new Image();
    image.onload = () => {
      this.imageLoaded(imageData, image);
    }
    image.src = imageData.url;
  }

  imageLoaded(imageData: SimpleImageData, image: HTMLImageElement) {
    this.imagesLoaded++;
    this.images = {
      ...this.images,
      [imageData.name]: image
    }
    if (this.shoudCallCallback()) this.callCallback();
  }

  shoudCallCallback(): boolean {
    return this.imagesLoaded === this.numImages;
  }

  callCallback(): void {
    this.callback();
  }
}

export default class ImageManager {

  classes: Array<ValidClass>;
  numImages: number;
  imagesLoaded: number;
  images: SimpleLoadedImages; // this is just to make Typescript happy
  callback: () => any;

  constructor(classes: Array<ValidClass>, callback: () => any) {
    this.classes = classes;
    this.numImages = this.classes.reduce((totalNumber, currentClass) => {
      const numImagesInClass = currentClass.imagesUrl.length;
      return totalNumber + numImagesInClass;
    }, 0);
    this.imagesLoaded = 0;
    this.images = {};

    this.callback = callback;
  }

  loadImages() {
    this.classes.forEach(classPassed => {
      classPassed.imagesUrl.forEach(imageUrl => this.loadImage(imageUrl, classPassed));;
    })
    return this;
  }

  loadImage(imageUrl: string, classPassed: ValidClass) {
    const image = new Image();
    image.onload = () => {
      this.setImage(classPassed, image);
    }
    image.src = imageUrl;
  }

  setImage(classPassed: ValidClass, image: HTMLImageElement) {
    this.imagesLoaded++;
    classPassed.images.push(image);
    if (this.shoudCallCallback()) this.callCallback();
  }

  shoudCallCallback() {
    return this.imagesLoaded === this.numImages;
  }

  callCallback() {
    this.callback();
  }
}