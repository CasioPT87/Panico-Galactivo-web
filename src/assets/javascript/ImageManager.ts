import Cloud from '../../components/space/classes/cloud/Cloud';

type ValidClass = typeof Cloud;

export default class ImageManager {

  classes: [ValidClass];
  numImages: number;
  imagesLoaded: number;
  callback: () => any;

  constructor(classes: [ValidClass], callback: () => any) {
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