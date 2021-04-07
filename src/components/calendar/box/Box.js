import styles from './Box.module.css'

export default function({ dayData, selectDate, selectedDate }) {
  
  const isSunday = () => {
    return dayData.date.day() === 0;
  }

  const isSelectedDate = () => {
    return dayData.date.month() === selectedDate.month() &&
          dayData.date.date() === selectedDate.date();
  }

  const isActive = () => {
    return dayData.active;
  }

  const pickDate = () => {
    if (!isActive()) return;
    selectDate(dayData.date);
  }

  return (
    <a onClick={pickDate} className={`
      ${styles.c_boxes__item}
      ${!isActive() ? styles['c_boxes__item--inactive'] : ''}
      ${isSunday() ? styles['c_boxes__item--sunday'] : ''}
      ${isSelectedDate() ? styles['c_boxes__item--selected'] : ''}
      `}>
      {dayData.info.dayDisplay}
    </a>
  )
}