import styles from "./Display.module.css";

export default function ({ selectedDate, width }) {
  if (!selectedDate) return null;
  return (
    <div style={{ width: width }} className={styles.c_display}>
      {selectedDate.format("dddd MMMM Do, YYYY")}
    </div>
  );
}
