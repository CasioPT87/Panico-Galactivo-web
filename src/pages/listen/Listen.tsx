import { useLayoutEffect, useRef, useState } from "react";
import Video from "./../../components/video/Video";
import Page from "../../components/page/Page";
import { SimpleImageLoader } from "../../assets/javascript/ImageManager";
import background from '../../assets/images/background-1.png';
import styles from './Listen.module.css';

const SRCs: Array<[string, string]> = [
  ["under my bed", "https://www.youtube.com/embed/hyebzZDkft4"],
  ["bulletproof", "https://www.youtube.com/embed/lc3zcEykhgs"],
  ["mono", "https://www.youtube.com/embed/s0eBpKdiVDQ"],
  ["panico galactico", "https://www.youtube.com/embed/zQrU5gK8YRI"],
  ["get out", "https://www.youtube.com/embed/Hc03jQnFRis"],
  ["castigado", "https://www.youtube.com/embed/zhCLCD3PBU0"],
  ["cup of tea", "https://www.youtube.com/embed/Qt8JMx6Ng_Y"],
  ["aliens", "https://www.youtube.com/embed/exyhhQRfjgg"],
  ["monster", "https://www.youtube.com/embed/ULWObqMVjkU"],
  ["molotov", "https://www.youtube.com/embed/zheWV5K8Shg"],
];

const imageData = [
  { name: 'background', url: background }
];

const Listen = () => {
  const elem = useRef<HTMLDivElement>(null!);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  useLayoutEffect(() => {
    setDimensions(elem.current.getBoundingClientRect());
  }, []);

  return (
    <Page ref={elem} loader={SimpleImageLoader} imageData={imageData} extraStylesContainer={styles.parallax}>
      <>
      {SRCs.map((src) => (
        <Video key={src[0]} src={src} dimensions={dimensions} />
      ))}
      </>
    </Page>
  );
};

export default Listen;
