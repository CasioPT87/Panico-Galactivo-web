import React, { useState }from 'react';
import moment from 'moment';
import { useSpring, animated } from 'react-spring'
import CalendarMonth from './calendar-month/CalendarMonth';
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
  const [monthTable, setMonthTable] = useState(moment().month());

  const selectDate = () => {
    console.log('we are selecting a date')
  }

  const goTo = (direction) => {
    let positionIndex = POSITIONS.findIndex(pos => pos === position);
    if (positionIndex < 0 || position > (POSITIONS.length - 1)) return;
    if (direction === 'left') positionIndex--;
    if (direction === 'right') positionIndex++;
    if (!!POSITIONS[positionIndex]) {
      setPosition(POSITIONS[positionIndex]);
    }
  }

  const calendarWindowStyle = () => {
    const styleClass = `c_calendar--${position}`
    return styles[styleClass];
  }

  return (
    <div className={styles.c_calendar__wrapper}>
      <div className={calendarWindowStyle()}>
        <CalendarMonth monthTable={H.getPreviousMonth(monthTable)} selectedDate={selectedDate} selectDate={selectDate} goTo={goTo}/>
        <CalendarMonth monthTable={monthTable} selectedDate={selectedDate} selectDate={selectDate} goTo={goTo}/>
        <CalendarMonth monthTable={H.getNextMonth(monthTable)} selectedDate={selectedDate} selectDate={selectDate} goTo={goTo}/>
      </div>
    </div>
  );
}