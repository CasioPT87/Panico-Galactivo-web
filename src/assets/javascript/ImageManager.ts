import Cloud from '../../components/space/classes/cloud/Cloud';
import { Spaceship } from '../../components/space/classes/spaceship/Spaceship';
import { Town } from '../../components/space/classes/town/Town';
import { Name } from '../../components/space/classes/name/Name';

type ValidClass = typeof Cloud | typeof Spaceship | typeof Town | typeof Name;
type SimpleImageData = {
  name: string,
  url: string
}
export class SimpleImageLoader {
  imagesData: Array<SimpleImageData>;
  numImages: number;
  imagesLoaded: number;
  urlsLoaded: Array<string>;
  callback: () => any;

  constructor(imagesData: Array<SimpleImageData>, callback: () => any) {
    this.imagesData = imagesData;
    this.numImages = imagesData.length;
    this.imagesLoaded = 0;
    this.urlsLoaded = [];
    this.callback = callback;
  }

  onImageLoaded(imageUrl: string): undefined {
    console.log(imageUrl, this.urlsLoaded)
    if (!this.urlsLoaded.includes(imageUrl)) {
      this.imagesLoaded++;
      this.urlsLoaded.push(imageUrl);
      if (this.shoudCallCallback()) this.callCallback();
    }
    return;
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
  callback: () => any;

  constructor(classes: Array<ValidClass>, callback: () => any) {
    this.classes = classes;
    this.numImages = this.classes.reduce((totalNumber, currentClass) => {
      const numImagesInClass = currentClass.imagesUrl.length;
      return totalNumber + numImagesInClass;
    }, 0);
    this.imagesLoaded = 0;
    this.callback = callback;
  }

  loadImages() {
    this.classes.forEach(classPassed => {
      classPassed.imagesUrl.forEach(imageUrl => this.loadImage(imageUrl, classPassed));;
    })
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