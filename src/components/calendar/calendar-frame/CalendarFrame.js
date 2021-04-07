import React, { useContext } from 'react';
import H, { DAYS_WEEK } from '../helper/CalendarHelper';
import { SizeContext } from '../Calendar';

import styles from './CalendarFrame.module.css'

export default function({children, helper, numRows, tableDays, weekLength}) {
  const size = useContext(SizeContext);

  const daysOrderedByRow = () => {
    const daysOrderedByRow = [];
    for (let i = 0; i < numRows; i++) {
      daysOrderedByRow[i] = tableDays.slice(i * weekLength, (i + 1) * weekLength);
    }
    return daysOrderedByRow;
  }

  const row = (rowData) => {
    return rowData.map(day => {
      const key = day.date.format('dddd, MMMM Do YYYY');
      return children(key, day);
    })
  }

  const rowDayNames = () => {
    return Object.values(DAYS_WEEK).map(day => {
      return <div key={day[1]} className={styles.c_boxes__day_name}>{day[1]}</div>
    });
  }

  const rowMonthName = () => {     
    return <div className={styles.c_boxes__month_name}>{`${helper.getMonthDisplay()}, ${helper.getYearDisplay()}`}</div>
  }

  return (
    <div style={{ width: size }} className={styles.c_boxes}>
      <div className={styles.c_boxes__row}>
        {rowMonthName()}
      </div>
      <div className={styles.c_boxes__row}>
        {rowDayNames()}
      </div>
      {daysOrderedByRow().map((rowData, i) => {
        return (
          <div key={i} className={styles.c_boxes__row}>
            {row(rowData)}
          </div>
        )
      })}
    </div>
  );
}