import styles from './Box.module.css'

export default function({ dayData }) {
  return (
    <div className={styles.c_boxes__item}>{dayData.info.dayDisplay}</div>
  )
}