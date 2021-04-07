import styles from './Box.module.css'

export default function({ dayData, selectedDate }) {
  const isSunday = () => {
    return dayData.date.day() === 0;
  }
  return (
    <div className={`
      ${styles.c_boxes__item}
      ${dayData.inactive ? styles['c_boxes__item--inactive'] : ''}
      ${isSunday() ? styles['c_boxes__item--sunday'] : ''}
      `}>
      {dayData.info.dayDisplay}
    </div>
  )
}