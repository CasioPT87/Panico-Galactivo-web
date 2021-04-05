import React from 'react';
import H from '../helper/CalendarHelper'
import Box from '../box/Box';
import CalendarFrame from '../calendar-frame/CalendarFrame'
import moment from 'moment';


export default class CalendarMonth extends React.Component {

  state = {
    selectedDate: {
      day: moment().date(),
      month: moment().month(),
      year: moment().year(),
      dayOfWeek: moment().day()
    }
  }

  componentDidMount() {
    window.time = H;
  }

  selectDate = (date) => {
    console.log('here we are going to selec the date')
  }

  setCurrentDate = () => {
    this.setState({ date: H.currentDate() });
  }

  render() {
    const { selectedDate, selectedDate: { month } } = this.state;
    return (
      <div>
        <CalendarFrame
          month={month}
          numRows={H.numberOfRowsForMonthTable(month)}
          tableDays={H.dayObjectsForMonthTable(month)}
          weekLength={H.numberOfDaysWeek()}
        >
          {(index, dayData) => <Box index={index} dayData={dayData} selectedDate={selectedDate} selectDate={this.selectDate} />}
        </CalendarFrame>
      </div>
    );
  }
}