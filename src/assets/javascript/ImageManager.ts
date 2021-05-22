import Cloud from '../../components/space/classes/cloud/Cloud';
import { Spaceship } from '../../components/space/classes/spaceship/Spaceship';
import { Town } from '../../components/space/classes/town/Town';
import { Name } from '../../components/space/classes/name/Name';

type ValidClass = typeof Cloud | typeof Spaceship | typeof Town | typeof Name;

export default class ImageManager {

  classes: Array<ValidClass>;
  numImages: number;
  imagesLoaded: number;
  callback: () => any;

  constructor(classes: Array<ValidClass>, callback: () => any) {
    console.log('contructor')
    this.classes = classes;
    this.numImages = this.classes.reduce((totalNumber, currentClass) => {
      const numImagesInClass = currentClass.imagesUrl.length;
      return totalNumber + numImagesInClass;
    }, 0);
    this.imagesLoaded = 0;
    this.callback = callback;
  }

  loadImages() {
    console.log(this.classes)
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
    console.log(this.imagesLoaded === this.numImages)
    return this.imagesLoaded === this.numImages;
  }

  callCallback() {
    this.callback();
  }
}