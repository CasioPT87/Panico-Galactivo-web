import background from './../../assets/images/background-1.png';
import styles from './Aliens.module.css';

const Aliens = () => {
  return (
    <div className={styles.parallax}>
      <div className={styles.video}>
        <iframe
         src="https://www.youtube.com/embed/udQpHFuUqus"
         frameborder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
         allowfullscreen>
        </iframe>
      </div>
      <div className={styles.video}>
        <iframe
         width="560"
         height="315"
         src="https://www.youtube.com/embed/udQpHFuUqus"
         title="YouTube video player" frameborder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
         allowfullscreen>
        </iframe>
      </div>
      <div className={styles.video}>
        <iframe
         width="560"
         height="315"
         src="https://www.youtube.com/embed/udQpHFuUqus"
         title="YouTube video player" frameborder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
         allowfullscreen>
        </iframe>
      </div>
      <div className={styles.video}>
        <iframe
         width="560"
         height="315"
         src="https://www.youtube.com/embed/udQpHFuUqus"
         title="YouTube video player" frameborder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
         allowfullscreen>
        </iframe>
      </div>
    </div>

    
  )
};

export default Aliens;