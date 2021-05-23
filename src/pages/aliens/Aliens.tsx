import { useState } from "react";
import cx from "classnames";
import Alien from "../../components/alien/Alien";
import Arrows from "../../components/arrows/Arrows";
import markPic from "../../assets/images/mark.png";
import daniPic from "../../assets/images/dani.png";
import erniePic from "../../assets/images/ernie.png";
import sergioPic from "../../assets/images/sergio.png";
import background from '../../assets/images/background-2.png';
import { SimpleImageLoader } from "../../assets/javascript/ImageManager";
import { findImageDataByName } from "../../assets/javascript/Utils";
import Page from '../../components/page/Page';
import styles from "./Aliens.module.css";

const ALIENS: Array<{
  name: string;
  photo: string;
  description: string;
  role: string;
}> = [
  {
    name: "MARKTHULHU",
    photo: 'markPic',
    description:
      "From the deepest of an unknown system. Be careful, bites. You have been warned",
    role: "guitar player",
  },
  {
    name: "DANIERLGH",
    photo: 'daniPic',
    description:
      "Climbs walls with no effort. Like a gecko... but from Mars",
    role: "bass player",
  },
  {
    name: "ERNIESTURION",
    photo: 'erniePic',
    description:
      "Plays drums faster than the speed of light. Poor human physics don't apply. Ah!, and keeps the tempo too",
    role: "drum player",
  },
  {
    name: "SERGIOTRON-3000",
    photo: 'sergioPic',
    description:
      "From Planet-4. Half high-tech robot, half not such a high-tech one. His voice is out of hearing range for many creatures, including himself",
    role: "singer",
  },
];

const imageData = [
  { name: 'background', url: background },
  { name: 'markPic', url: markPic },
  { name: 'daniPic', url: daniPic },
  { name: 'erniePic', url: erniePic },
  { name: 'sergioPic', url: sergioPic }
];

const Aliens = () => {
  const [position, setPosition] = useState(0);

  return (
    <Page loader={SimpleImageLoader} imageData={imageData} extraStylesContainer={{}}>
      <div className={cx(styles.container, styles["position--" + position])}>
        {ALIENS.map(alien =>  <Alien key={alien.role} alien={alien} photo={findImageDataByName(imageData, alien.photo)} /> )}
      </div>
      <Arrows position={position} setPosition={setPosition} />
    </Page>
  );
};

export default Aliens;
