import React from 'react';
import moment from 'moment';
import CalendarMonth from './calendar-month/CalendarMonth';
import H from './helper/CalendarHelper';
import styles from './Calendar.module.css';

const POSITIONS = ['left', 'center', 'right'];
export default class Calendar extends React.PureComponent {

  state = {
    position: 'center',
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

  goTo = (direction) => {
    const { position } = this.state;
    let positionIndex = POSITIONS.findIndex(pos => pos === position);
    if (positionIndex < 0 || position > (POSITIONS.length - 1)) return;
    if (direction === 'left') positionIndex--;
    if (direction === 'right') positionIndex++;
    if (!!POSITIONS[positionIndex]) {
      this.setState({ position: POSITIONS[positionIndex] });
    }
  }

  calendarWindowStyle = () => {
    const { position } = this.state;
    const styleClass = `c_calendar--${position}`
    return styles[styleClass];
  }

  render() {
    const { monthTable, position, selectedDate } = this.state;

    return (
      <div className={styles.c_calendar__wrapper}>
        <div className={this.calendarWindowStyle()}>
          <CalendarMonth monthTable={H.getPreviousMonth(monthTable)} selectedDate={selectedDate} selectDate={this.selectDate} goTo={this.goTo}/>
          <CalendarMonth monthTable={monthTable} selectedDate={selectedDate} selectDate={this.selectDate} goTo={this.goTo}/>
          <CalendarMonth monthTable={H.getNextMonth(monthTable)} selectedDate={selectedDate} selectDate={this.selectDate} goTo={this.goTo}/>
        </div>
      </div>
    );
  }
}