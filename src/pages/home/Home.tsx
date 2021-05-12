import { useLayoutEffect, useRef, useState } from "react";
import Space from "./../../components/space/Space";
import styles from "./Home.module.css";

const Home = () => {
  const elem = useRef<HTMLDivElement>(null!);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  useLayoutEffect(() => {
    setDimensions(elem.current.getBoundingClientRect());
  }, []);

  return (
    <div ref={elem} className={styles.container}>
      <Space
        frameSize={{ height: dimensions.height, width: dimensions.width }}
      />
    </div>
  );
};

export default Home;
