import Space from './../../components/space/Space'
import background from '../../assets/images/background-home.png';
import styles from './Home.module.css';

export default () => {
  return (
    <div>
      <img className={styles.container} src={background}/>
      <Space />
    </div>  
  )
}