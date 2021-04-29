import { Link } from "react-router-dom";

import styles from './Navigation.module.css';

export default () => {
  return (
    <div className={styles.container}>
      <Link to="/">Home</Link>
      <Link to="/about">Members</Link>
      <Link to="/users">Listen</Link>
    </div>
  )
}