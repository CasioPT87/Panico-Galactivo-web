import Typing from '../typing/Typing';
import styles from './Header.module.css';

export default () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        <Typing text={"panico galactico"} />
      </h1>
    </header>
  )
}