
import React, { useState, useEffect } from "react";
import cx from "classnames";
import Loading from "../loading/Loading";
import { Loader, LoaderType } from "../../assets/javascript/SharedTypes";
import styles from "./Page.module.css";

const showContent = (hasDomImages: boolean, imagesLoaded: boolean, imageLoader: Loader, imageName: string): boolean => {
  if (!hasDomImages) return imagesLoaded
  return imagesLoaded && imageLoader?.images[imageName].complete;
}

let imageLoader: Loader;

type Props = {
  imageData: any, //Array<ImageData> | Array<DrawingImageClasses>,
  loader: LoaderType,
  extraStylesContainer?: string
  hasDomImages: boolean,
  loadedCallback: any,
  children: JSX.Element | false;
}

const Page = React.forwardRef<HTMLDivElement, Props>(({ imageData, loader, extraStylesContainer, hasDomImages, loadedCallback, children }: Props, ref): JSX.Element => {

  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    imageLoader = new loader( imageData, () => setImagesLoaded(true)).loadImages();
  }, []);

  useEffect(() => {
    loadedCallback(imagesLoaded);
  }, [imagesLoaded])

  return (
    <>
      <Loading ref={ref} show={!imagesLoaded} />
      <div data-testid="members-container"
      className={cx(
        styles.wrapper, styles.background,
        !showContent(hasDomImages, imagesLoaded, imageLoader, 'background') ? styles.hidden : null,
        extraStylesContainer
      )}>
        {!!children && children}
      </div>
    </>
  )})

export default Page;