import { useEffect, useRef, useState } from "react";
import Page from "../../components/page/Page";
import Space from "./../../components/space/Space";
import Cloud from "./../../components/space/classes/cloud/Cloud";
import { Spaceship } from '../../components/space/classes/spaceship/Spaceship';
import { Town } from '../../components/space/classes/town/Town';
import { Name } from '../../components/space/classes/name/Name';
import ImageManager from "../../assets/javascript/ImageManager";

const Home = () => {
  const elem = useRef<HTMLDivElement>(null!);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setDimensions(elem.current.getBoundingClientRect());
  }, []);

  return (
    <Page ref={elem} loader={ImageManager} imageData={[Cloud, Spaceship, Town, Name]} hasDomImages={false} loadedCallback={setLoaded}>
      {loaded &&
        <Space
          frameSize={{ height: dimensions.height, width: dimensions.width }}
        />
      }
    </Page>
  );
};

export default Home;
