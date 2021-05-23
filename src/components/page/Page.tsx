
import { useState, useEffect } from "react";
import cx from "classnames";
import ImageManager, { SimpleImageLoader } from "../../assets/javascript/ImageManager";
import { ImageData, Loader } from "../../assets/javascript/SharedTypes";
import styles from "./Page.module.css";

const showContent = (imagesLoaded: boolean, imageLoader: any, imageName: string) => {
  return imagesLoaded && imageLoader?.images[imageName].complete;
}

let imageLoader: Loader;

const Page = ({ imageData, loader, children } : { imageData: Array<ImageData>, loader: any, children: any }) => {

  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    imageLoader = new loader( imageData, () => setImagesLoaded(true)).loadImages();
  }, []);

  return (
    <>
      {!imagesLoaded && <div className={cx(styles.wrapper, styles.loading)}><p>loading...</p></div>}
      <div data-testid="members-container" className={cx(styles.wrapper, styles.background, !showContent(imagesLoaded, imageLoader, 'background') ? styles.hidden : null)}>
        {children}
      </div>
    </>
  )}

export default Page;