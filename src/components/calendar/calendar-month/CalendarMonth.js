import React from 'react';
import H from '../helper/CalendarHelper'
import Box from '../box/Box';
import CalendarFrame from '../calendar-frame/CalendarFrame'

export default function({ dateTable, selectDate, selectedDate }) {
  const helper = new H(dateTable);
  console.log(dateTable)
  return ( 
    <CalendarFrame
      helper={helper}
      numRows={helper.numberOfRowsForMonthTable()}
      tableDays={helper.dayObjectsForMonthTable()}
      weekLength={H.numberOfDaysWeek()}
    >
      {(index, dayData) => <Box index={index} dayData={dayData} selectedDate={selectedDate} selectDate={selectDate} />}
    </CalendarFrame>
  );

}