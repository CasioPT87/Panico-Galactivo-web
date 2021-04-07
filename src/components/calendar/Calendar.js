import React, { useState }from 'react';
import moment from 'moment';
import CalendarMonth from './calendar-month/CalendarMonth';
import Button from './buttons/Button'
import H from './helper/CalendarHelper';
import styles from './Calendar.module.css';

const POSITIONS = ['left', 'center', 'right'];

export const SizeContext = React.createContext(500);

export default class Calendar extends React.PureComponent {

  state = {
    selectedDate: moment(),
    position: 'center',
    transition: false,
    dateTable: moment(),
    helper: null
  };

  componentDidMount() {
    this.setState({ helper: new H(moment(this.state.dateTable)) }, () => {
      this.selectDate();
    });
  }

  selectDate = (date = this.state.selectedDate) => {
    const { selectDate } = this.props;
    this.setState({ selectedDate: date }, () => {
      selectDate(date);
    });
  }

  goTo = (e, direction) => {
    const { transitionTime } = this.props;
    const { helper } = this.state;
    e.preventDefault();
    let index = this.positionIndex();
    if (direction === 'center') return;
    if (direction === 'left') index--;
    if (direction === 'right') index++;
    if (!!POSITIONS[index]) {
      this.setState({
        transition: true,
        position: direction,
      }, () => {
        let dateTableToBe;
        if (direction === 'left') dateTableToBe = helper.getPreviousMonth();
        if (direction === 'right') dateTableToBe = helper.getNextMonth();

        setTimeout(() => {
          this.setState({
            transition: false,
            position: 'center',
            dateTable: dateTableToBe,
            helper: new H(dateTableToBe)
          });
        }, transitionTime*1000)
      });
    }
  }

  positionIndex = () => {
    const { position } = this.state;
    return POSITIONS.findIndex(pos => pos === position);
  }

  getStyles = () => {
    const { size, transitionTime } = this.props;
    const { transition } = this.state;
    return {
      width: (size*3) + 'px',
      left: -(this.positionIndex()*size) + 'px',
      transitionDuration: transition ? `${transitionTime}s` : '0s'
    }
  }

  render() {
    const { size, height } = this.props;
    const { dateTable, helper, selectedDate } = this.state;
    if (helper === null) return null;
    return (
      <SizeContext.Provider value={size}>
        <div style={{ height: size, width: size + 'px'}} className={styles.c_calendar__wrapper}>
          <div className={styles.c_boxes__buttons}>
            <Button display="<<" goTo={(e) => this.goTo(e, 'left')}/>
            <Button display=">>" goTo={(e) => this.goTo(e, 'right')}/>
          </div>
          <div style={this.getStyles()} className={`${styles.c_calendar} ${styles.transition}`}>
            <CalendarMonth dateTable={helper.getPreviousMonth()} selectedDate={selectedDate} selectDate={this.selectDate} />
            <CalendarMonth dateTable={dateTable} selectedDate={selectedDate} selectDate={this.selectDate} />
            <CalendarMonth dateTable={helper.getNextMonth()} selectedDate={selectedDate} selectDate={this.selectDate} />
          </div>
        </div>
      </ SizeContext.Provider>
    );
  }
}