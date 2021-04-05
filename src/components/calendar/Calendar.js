import React, { useState }from 'react';
import moment from 'moment';
import CalendarMonth from './calendar-month/CalendarMonth';
import Button from './buttons/Button'
import H from './helper/CalendarHelper';
import styles from './Calendar.module.css';

const POSITIONS = ['left', 'center', 'right'];

export const WidthContext = React.createContext(500);

export default function({ transitionTime, width }) {

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
    let index = positionIndex();
    if (direction === 'left') index--;
    if (direction === 'right') index++;
    if (!!POSITIONS[index]) {
      setTransition(true);
      setPosition(direction);
      setTimeout(() => {
        setTransition(false);
        setPosition('center');
        if (direction === 'left') setMonthTable(H.getPreviousMonth(monthTable));
        if (direction === 'right') setMonthTable(H.getNextMonth(monthTable));
      }, transitionTime*1000);
    }
  }

  const positionIndex = () => {
    return POSITIONS.findIndex(pos => pos === position);
  }

  const calendarStyle = {
    width: (width*3) + 'px',
    left: -(positionIndex()*width) + 'px',
    'transition-duration': transition ? `${transitionTime}s` : '0s'
  }

  return (
    <WidthContext.Provider value={width}>
      <div style={{ width: width + 'px'}} className={styles.c_calendar__wrapper}>
        <div className={styles.c_boxes__buttons}>
          <Button display="<<" goTo={(e) => goTo(e, 'left')}/>
          <Button display=">>" goTo={(e) => goTo(e, 'right')}/>
        </div>
        <div style={calendarStyle} className={`${styles.c_calendar} ${styles.transition}`}>
          <CalendarMonth monthTable={H.getPreviousMonth(monthTable)} selectedDate={selectedDate} selectDate={selectDate} />
          <CalendarMonth monthTable={monthTable} selectedDate={selectedDate} selectDate={selectDate} />
          <CalendarMonth monthTable={H.getNextMonth(monthTable)} selectedDate={selectedDate} selectDate={selectDate} />
        </div>
      </div>
    </ WidthContext.Provider>
  );
}