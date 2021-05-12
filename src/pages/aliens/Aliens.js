import React from 'react';
import wayne from '../../assets/images/wayne rainey.jpeg';
import styles from './Aliens.module.css';

const Aliens = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sergio}>
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
      <div className={styles.forward} onClick={() => alert('eooo')}>forward</div>
    </div>  
  )
};

export default Aliens;