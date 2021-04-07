import styles from './Box.module.css'

export default function({ dayData, selectedDate }) {
  return (
    <div className={`${styles.c_boxes__item} ${dayData.inactive ? styles['c_boxes__item--inactive'] : ''}`}>
      {dayData.info.dayDisplay}
    </div>
  )
}