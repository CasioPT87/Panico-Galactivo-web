import React from 'react';
import moment from 'moment';
import CalendarMonth from './calendar-month/CalendarMonth';
import H from './helper/CalendarHelper';
import styles from './Calendar.module.css'

export default class Calendar extends React.PureComponent {

  state = {
    monthTable: moment().month(),
    selectedDate: {
      day: moment().date(),
      month: moment().month(),
      year: moment().year(),
      dayOfWeek: moment().day()
    }
  }

  selectDate = () => {
    console.log('we are selecting a date')
  }

  render() {
    const { monthTable, selectedDate } = this.state;

    return (
      <div className={styles.c_calendar}>
        <CalendarMonth monthTable={H.getPreviousMonth(monthTable)} selectedDate={selectedDate} selectDate={this.selectDate} />
        <CalendarMonth monthTable={monthTable} selectedDate={selectedDate}/>
        <CalendarMonth monthTable={H.getNextMonth(monthTable)} selectedDate={selectedDate} selectDate={this.selectDate}/>
      </div>
    );
  }
}