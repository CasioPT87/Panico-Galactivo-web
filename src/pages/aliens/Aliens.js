import { useState } from 'react';
import cx from 'classnames';
import wayne from '../../assets/images/wayne rainey.jpeg';
import styles from './Aliens.module.css';

const Aliens = () => {

  const [position, setPosition] = useState(0);

  console.log(position)

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.sergio, styles['position--' + position])
      }>
        <div className={styles.container}>
          <img src={wayne} />
          <p>this is the description of mark</p>
        </div>
        <div className={styles.container}>
          <img src={wayne} />
          <p>this is the description of ernie</p>
        </div>
        <div className={styles.container}>
          <img src={wayne} />
          <p>this is the description of dani</p>
        </div>
        <div className={styles.container}>
          <img src={wayne} />
          <p>this is the description of pepe</p>
        </div>
      </div>
      <div className={styles.forward} onClick={() => setPosition(position + 1)}>forward</div>
    </div>  
  )
};

export default Aliens;