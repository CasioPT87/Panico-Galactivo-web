import { useState } from 'react';
import cx from 'classnames';
import Alien from '../../components/alien/Alien';
import markPic from '../../assets/images/mark.png';
import daniPic from '../../assets/images/dani.png';
import erniePic from '../../assets/images/ernie.png';
import sergioPic from '../../assets/images/sergio.png';
import styles from './Aliens.module.css';

const ALIENS: Array<{ name: string, photo: string, description: string }> = [
  {
     name: 'MARKTHULHU',
     photo: markPic,
     description: 'From the deepest of an unknown system. Be careful, bites. You have been warned'
  },
  {
     name: 'DANIERLGH',
     photo: daniPic,
     description: 'Climbs the walls with no effort. Like a gecko... but from Mars'
  },
  { 
    name: 'ERNIESTURION',
    photo: erniePic,
    description: 'Plays drums faster than the speed of light. And keeps the tempo too'
  },
  { name: 'SERGIOTRON',
    photo: sergioPic,
    description: 'Half a high-tech robot, half not such a high-tech one. His voice is out of hearing for much dog species'
  }
]

const Aliens = () => {

  const [position, setPosition] = useState(0);

  const calculatePosition = (position: number): number => {
    if (position > 3) return 0;
    if (position < 0) return 3;
    return position;
  }

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.container, styles['position--' + position])
      }>
        {ALIENS.map(alien => <Alien alien={alien} />)}
      </div>
      <div className={cx(styles.arrow, styles.forward)} onClick={() => setPosition(calculatePosition(position + 1))}>{">>>"}</div>
      <div className={cx(styles.arrow, styles.backward)} onClick={() => setPosition(calculatePosition(position - 1))}>{"<<<"}</div>
    </div>  
  )
};

export default Aliens;