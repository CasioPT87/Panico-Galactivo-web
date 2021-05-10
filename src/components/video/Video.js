import styles from './Video.module.css';

const Video = ({ src }) => {
  return (
    <div key={src[1]} className={styles.video}>
      <iframe
        src={src[1]}
        width="560" height="315"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        onLoad={() => console.log('loaded!!!')}
        allowFullScreen>
      </iframe>
    </div>
  )
}

export default Video;