import styles from "./Button.module.css";

export default function ({ display, goTo }) {
  return (
    <a className={styles.c_button} onClick={goTo}>
      {display}
    </a>
  );
}
