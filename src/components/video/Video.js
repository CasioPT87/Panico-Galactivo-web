import { useState } from 'react';
import Loader from "react-loader-spinner";
import styles from './Video.module.css';

const Video = ({ src }) => {

  const [active, setActive] = useState(false);

  return (
    <>
      <div key={src[1]} className={!active ? styles.hidden : styles.video}>  
        <iframe
          src={src[1]}
          width="560" height="315"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          onLoad={() => setActive(true)}
          allowFullScreen>
        </iframe>
      </div>
      <div className={!active ? styles.spinnerContainer : styles.hidden}>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
      </div>
    </>
  )
}

export default Video;