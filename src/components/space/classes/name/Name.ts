import panico_1 from "../../../../assets/images/panico_1.png";
import panico_2 from "../../../../assets/images/panico_2.png";
import panico_3 from "../../../../assets/images/panico_3.png";
import panico_4 from "../../../../assets/images/panico_4.png";

const IMAGE_ASSETS = [panico_1, panico_2, panico_3, panico_4];

export class Name {

  static imagesUrl = IMAGE_ASSETS;
  static images = [] as Array<HTMLImageElement>;

  x: number;
  y: number;
  height: number;
  width: number;
  addEventListener: any;
  imageIndex: number | null;

  constructor(frameSize: any) {
    const marginTop = frameSize.width * 0.05;
    const marginSide = frameSize.width * 0.1;
    this.x = marginSide;
    this.y = marginTop;
    this.width = frameSize.width - 2 * marginSide;
    this.height = this.width / 8;
    this.imageIndex = null;
    window.addEventListener("landed", () => this.show());
  }

  show() {
    if (this.imageIndex === null) return;
    if (this.imageIndex >= Name.images.length) {
      this.imageIndex = 0;
    }

    setTimeout(() => {
      if (this.imageIndex === null) return;
      this.imageIndex++;
      this.show();
    }, 100);
  }

  get image(): HTMLImageElement | null {
    if (this.imageIndex === null) return null;
    return Name.images[this.imageIndex];
  }
}

const nameFactory: (frameSize: any) => Name = (frameSize) => {
  return new Name(frameSize);
};

export default nameFactory;
