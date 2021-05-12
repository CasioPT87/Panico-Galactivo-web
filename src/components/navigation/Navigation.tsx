import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export default () => {
  return (
    <div className={styles.container}>
      <NavLink to="/" activeClassName={styles.active} exact>Home</NavLink>
      <NavLink to="/aliens" activeClassName={styles.active} exact>Members</NavLink>
      <NavLink to="/music" activeClassName={styles.active} exact>Listen</NavLink>
    </div>
  )
}