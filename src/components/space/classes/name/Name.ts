import { phaseManager } from './../../Space';
import panico_1 from '../../../../assets/images/panico_1.png';
import panico_2 from '../../../../assets/images/panico_2.png';
import panico_3 from '../../../../assets/images/panico_3.png';
import panico_4 from '../../../../assets/images/panico_4.png';

const IMAGE_ASSETS = [panico_1, panico_2, panico_3, panico_4];

export class Name {

  x: number;
  y: number;
  height: number;
  width: number;
  imageCollection: Array<HTMLImageElement>;
  image: HTMLImageElement | null;
  addEventListener: any;

  constructor(frameSize: any) {
    const margin = frameSize.width * 0.05;
    this.x = margin;
    this.y = margin;
    this.width = frameSize.width - (2 * margin);
    this.height = this.width / 8;
    this.imageCollection = [];
    this.image = null;
    window.addEventListener('landed', () => this.show())
  }

  loadImage = (): Name => {
    IMAGE_ASSETS.forEach(image_asset => {
      const image = new Image();
      image.onload = () => {
        this.imageCollection.push(image);
      };
      image.src = image_asset;
    })
    return this;
  }

  show(index = 0) {
    if (index > this.imageCollection.length) {
      index = 0;
    }
    this.image = this.imageCollection[index];
    setTimeout(() => {
      index++;
      this.show(index)
    }, 100);
  }
}

const nameFactory: (CANVAS_SIZE: any) => Name = (CANVAS_SIZE) => {
  return new Name(CANVAS_SIZE).loadImage();
}

export default nameFactory;