import React from 'react';
import H from '../helper/CalendarHelper'
import Box from '../box/Box';
import Button from '../buttons/Button'
import CalendarFrame from '../calendar-frame/CalendarFrame'
import styles from './CalendarMonth.module.css'

export default function({ goTo, monthTable, selectDate, selectedDate }) {

  const goToMonth = (e, direction) => {
    e.preventDefault();
    goTo(direction);
  }

  return (
    <div>
      <div className={styles.c_boxes__buttons}>
        <Button display="<<" goTo={(e) => goToMonth(e, 'left')}/>
        <Button display=">>" goTo={(e) => goToMonth(e, 'right')}/>
      </div>
      <CalendarFrame
        month={monthTable}
        numRows={H.numberOfRowsForMonthTable(monthTable)}
        tableDays={H.dayObjectsForMonthTable(monthTable)}
        weekLength={H.numberOfDaysWeek()}
      >
        {(index, dayData) => <Box index={index} dayData={dayData} selectedDate={selectedDate} selectDate={selectDate} />}
      </CalendarFrame>
    </div>
  );

}