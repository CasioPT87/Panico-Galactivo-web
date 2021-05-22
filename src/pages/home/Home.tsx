import { useLayoutEffect, useRef, useState } from "react";
import Space from "./../../components/space/Space";
import Cloud from "./../../components/space/classes/cloud/Cloud";
import ImageManager from "../../assets/javascript/ImageManager";
import styles from "./Home.module.css";

const Home = () => {
  const elem = useRef<HTMLDivElement>(null!);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imageManager = new ImageManager([Cloud], () => setImagesLoaded(true)).loadImages();

  useLayoutEffect(() => {
    setDimensions(elem.current.getBoundingClientRect());
  }, []);

  if (!imagesLoaded) return (<div ref={elem} className={styles.container}>loading</div>)

  return (
    <div data-testid='home-container' className={styles.container}>
      <Space
        frameSize={{ height: dimensions.height, width: dimensions.width }}
      />
    </div>
  );
};

export default Home;
