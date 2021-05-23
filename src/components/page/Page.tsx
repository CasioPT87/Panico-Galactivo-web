
import React, { useState, useEffect, FunctionComponent } from "react";
import cx from "classnames";
import Loading from "../loading/Loading";
import { ImageData, Loader, LoaderType } from "../../assets/javascript/SharedTypes";
import styles from "./Page.module.css";

type Props = {
  imagesData: any,
  loader: LoaderType,
  extraStylesContainer?: string
  children: JSX.Element
}

let imageLoader: Loader;

const HiddenImages = (imagesData: any, loader:LoaderType, callback: any) => {

  useEffect(() => {
    imageLoader = new loader( imagesData, () => callback(true));
  }, []);

  if (!imageLoader) return null;

  return (
    <>
      {imagesData.map((imageData: any) => {
        return <img key={imageData.url} className={styles.hidden} onLoad={() => imageLoader.onImageLoaded(imageData.url)} src={imageData.url}/>
      })}
    </>
  )
}

// FunctionComponent<Props>
const Page = React.forwardRef<HTMLDivElement, Props>(({ imagesData, loader, extraStylesContainer, children }: Props, ref): JSX.Element => {

  const [imagesLoaded, setImagesLoaded] = useState(false);

  return (
    <>
      <Loading ref={ref} show={!imagesLoaded} />
      {HiddenImages(imagesData, loader, setImagesLoaded)}
      <div data-testid="members-container"
        className={cx(
          styles.wrapper, styles.background,
          !imagesLoaded ? styles.hidden : null,
          extraStylesContainer
        )}
      >
        {children}
      </div>
    </>
  )})

export default Page;