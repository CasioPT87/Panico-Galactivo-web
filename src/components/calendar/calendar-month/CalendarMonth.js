import React from 'react';
import H from '../helper/CalendarHelper'
import Box from '../box/Box';
import CalendarFrame from '../calendar-frame/CalendarFrame'

export default function({ monthTable, selectDate, selectedDate }) {
  return (
    <div>
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