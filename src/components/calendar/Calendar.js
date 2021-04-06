import React, { useState }from 'react';
import moment from 'moment';
import CalendarMonth from './calendar-month/CalendarMonth';
import Button from './buttons/Button'
import H from './helper/CalendarHelper';
import styles from './Calendar.module.css';

const POSITIONS = ['left', 'center', 'right'];

export const WidthContext = React.createContext(500);

export default class Calendar extends React.PureComponent {

  state = {
    selectedDate: moment(),
    position: 'center',
    transition: false,
    dateTable: moment(),
    helper: null
  };

  componentDidMount() {
    this.setState({ helper: new H(moment(this.state.dateTable)) });
  }

  componentDidUpdate() {
    const { position, helper } = this.state;
    let dateTableToBe
    if (position === 'center') return;
    if (position === 'left') dateTableToBe = helper.getPreviousMonth();
    if (position === 'right') dateTableToBe = helper.getNextMonth();
    this.setState({
      transition: false,
      position: 'center',
      dateTable: dateTableToBe,
      helper: new H(dateTableToBe)
    });
  }

  selectDate = () => {
    console.log('we are selecting a date')
  }

  goTo = (e, direction) => {
    e.preventDefault();
    let index = this.positionIndex();
    if (direction === 'left') index--;
    if (direction === 'right') index++;
    if (!!POSITIONS[index]) {
      this.setState({
        transition: true,
        position: direction,
      }, () => console.log('restate 1'));
    }
  }

  positionIndex = () => {
    const { position } = this.state;
    return POSITIONS.findIndex(pos => pos === position);
  }

  getStyles = () => {
    const { width, transitionTime } = this.props;
    const { transition } = this.state;
    return {
      width: (width*3) + 'px',
      left: 0 + 'px',
      transitionDuration: transition ? `${transitionTime}s` : '0s'
    }
  }

  render() {
    const { width, height } = this.props;
    const { dateTable, helper, selectedDate } = this.state;
    return (
      <WidthContext.Provider value={width}>
        <div style={{ height: height, width: (width*3) + 'px'}} className={styles.c_calendar__wrapper}>
          <div className={styles.c_boxes__buttons}>
            <Button display="<<" goTo={(e) => this.goTo(e, 'left')}/>
            <Button display=">>" goTo={(e) => this.goTo(e, 'right')}/>
          </div>
          <div style={this.getStyles()} className={`${styles.c_calendar} ${styles.transition}`}>
           
            <CalendarMonth dateTable={dateTable} selectedDate={selectedDate} selectDate={this.selectDate} />
          
          </div>
        </div>
      </ WidthContext.Provider>
    );
  }
}