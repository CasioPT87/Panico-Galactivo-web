import React, { useState }from 'react';
import moment from 'moment';
import CalendarMonth from './calendar-month/CalendarMonth';
import Button from './buttons/Button'
import H from './helper/CalendarHelper';
import styles from './Calendar.module.css';

const POSITIONS = ['left', 'center', 'right'];
export default function() {

  const [selectedDate, setSelectedDate] = useState({
    day: moment().date(),
    month: moment().month(),
    year: moment().year(),
    dayOfWeek: moment().day()
  });

  const [position, setPosition] = useState('center');
  const [transition, setTransition] = useState(false);
  const [monthTable, setMonthTable] = useState(moment().month());

  const selectDate = () => {
    console.log('we are selecting a date')
  }

  const goTo = (e, direction) => {
    e.preventDefault();
    let positionIndex = POSITIONS.findIndex(pos => pos === position);
    if (positionIndex < 0 || position > (POSITIONS.length - 1)) return;
    if (direction === 'left') positionIndex--;
    if (direction === 'right') positionIndex++;
    if (!!POSITIONS[positionIndex]) {
      setTransition(true);
      setPosition(POSITIONS[positionIndex]);
      setTimeout(() => {
        setTransition(false);
        setPosition('center');
        if (direction === 'left') setMonthTable(H.getPreviousMonth(monthTable));
        if (direction === 'right') setMonthTable(H.getNextMonth(monthTable));
      }, 600);
    }
  }

  const calendarWindowStyle = () => {
    const styleClass = `c_calendar--${position}`
    return styles[styleClass];
  }

  const shouldTransition = () => {
    if (!transition) return null;
    return styles['c_calendar--transition'];
  }

  return (
    <div className={styles.c_calendar__wrapper}>
      <div className={styles.c_boxes__buttons}>
        <Button display="<<" goTo={(e) => goTo(e, 'left')}/>
        <Button display=">>" goTo={(e) => goTo(e, 'right')}/>
      </div>
      <div className={`${styles.c_calendar} ${shouldTransition()} ${calendarWindowStyle()}`}>
        <CalendarMonth monthTable={H.getPreviousMonth(monthTable)} selectedDate={selectedDate} selectDate={selectDate} />
        <CalendarMonth monthTable={monthTable} selectedDate={selectedDate} selectDate={selectDate} />
        <CalendarMonth monthTable={H.getNextMonth(monthTable)} selectedDate={selectedDate} selectDate={selectDate} />
      </div>
    </div>
  );
}