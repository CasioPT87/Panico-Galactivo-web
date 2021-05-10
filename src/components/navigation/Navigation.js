import { Link } from "react-router-dom";

import styles from './Navigation.module.css';

export default () => {
  return (
    <div className={styles.container}>
      <Link to="/">Home</Link>
      <Link to="/aliens">Members</Link>
      <Link to="/music">Listen</Link>
    </div>
  )
}