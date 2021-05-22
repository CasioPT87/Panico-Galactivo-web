import { useState } from "react";
import Loader from "react-loader-spinner";
import cx from "classnames";
import styles from "./Video.module.css";

type Dimensions = {
  height: number;
  width: number;
};

const getVideoDimensions = (dimensions: Dimensions): Dimensions => {
  const width = dimensions.width < 560 ? dimensions.width * 0.9 : 560;
  const height = width * (9 / 16);
  return { height, width };
};

const Video = ({
  src,
  dimensions,
}: {
  src: [string, string];
  dimensions: { height: number; width: number };
}) => {
  const [active, setActive] = useState(false);

  let { height, width } = getVideoDimensions(dimensions);

  return (
    <div className={styles.container}>
      <h3>{src[0]}</h3>
      <div key={src[1]} className={!active ? styles.hidden : styles.video}>
        <iframe
          title={src[0]}
          src={src[1]}
          width={width}
          height={height}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={() => setActive(true)}
          allowFullScreen
        ></iframe>
      </div>
      <div className={!active ? cx(styles.spinnerContainer, styles.video) : styles.hidden}>
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      </div>
    </div>
  );
};

export default Video;
