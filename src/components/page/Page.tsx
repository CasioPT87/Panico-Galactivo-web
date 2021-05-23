
import React, { useState, useEffect, FunctionComponent } from "react";
import cx from "classnames";
import Loading from "../loading/Loading";
import { ImageData, Loader, LoaderType } from "../../assets/javascript/SharedTypes";
import styles from "./Page.module.css";

const showContent = (imagesLoaded: boolean, imageLoader: Loader, imageName: string) => {
  return imagesLoaded && imageLoader?.images[imageName].complete;
}

let imageLoader: Loader;

type Props = {
  imageData: Array<ImageData>,
  loader: LoaderType,
  extraStylesContainer: any
}

// FunctionComponent<Props>
const Page: any = React.forwardRef<HTMLDivElement, Props>(({ imageData, loader, extraStylesContainer, children }: any, ref): JSX.Element => {

  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    imageLoader = new loader( imageData, () => setImagesLoaded(true)).loadImages();
  }, []);

  return (
    <>
      <Loading ref={ref} show={!imagesLoaded} />
      <div data-testid="members-container"
      className={cx(
        styles.wrapper, styles.background,
        !showContent(imagesLoaded, imageLoader, 'background') ? styles.hidden : null,
        extraStylesContainer
      )}>
        {children}
      </div>
    </>
  )})

export default Page;