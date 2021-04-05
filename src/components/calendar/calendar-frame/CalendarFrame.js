import React from 'react'

import styles from './CalendarFrame.module.css'

export default function({children, month, numRows, tableDays, weekLength}) {

  const daysOrderedByRow = () => {
    const daysOrderedByRow = [];
    for (let i = 0; i < numRows; i++) {
      daysOrderedByRow[i] = tableDays.slice(i * weekLength, (i + 1) * weekLength);
    }
    console.log(daysOrderedByRow)
    return daysOrderedByRow;
  }

  const row = (rowData, rowIndex) => {
    return rowData.map(day => {
      const key = `${month}, ${rowIndex}, ${day.index}`
      return children(key, day);
    })
  }

 
  return (
    <div className={styles.c_boxes}>
      {daysOrderedByRow().map((rowData, i) => {
        return (
          <div className={styles.c_boxes__row}>
            {row(rowData, i)}
          </div>
        )
      })}
    </div>
  );
}