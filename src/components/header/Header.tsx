import Typing from "../typing/Typing";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        <Typing text={"panico galactico"} />
      </h1>
    </header>
  );
};

export default Header;
