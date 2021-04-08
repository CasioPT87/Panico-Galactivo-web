import Typing from '../typing/Typing';
import styles from './Header.module.css';

export default () => {
  return (
    <header className={styles.container}>
      <h1>
        <Typing text={["panico galactico"]} />
      </h1>
      <h3>
        <Typing text={["panico galactico"]} />
      </h3>
    </header>
  )
}