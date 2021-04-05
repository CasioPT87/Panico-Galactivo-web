import React from 'react';
import CalendarMonth from './calendar-month/CalendarMonth';
import styles from './Calendar.module.css'

export default class Calendar extends React.PureComponent {
  render() {
    return (
      <div className={styles.c_calendar}>
        <CalendarMonth />
        <CalendarMonth />
        <CalendarMonth />
      </div>
    );
  }
}