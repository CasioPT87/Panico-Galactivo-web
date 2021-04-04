import React from 'react';
import H from './CalendarHelper'
import moment from 'moment';


export default class Calendar extends React.Component {

  state = {
    currentDate: {
      day: null,
      month: null,
      year: null,
      dayOfWeek: null
    }
  }

  componentDidMount() {
    this.setCurrentDate();
    window.time = H;
    debugger
  }

  setCurrentDate = () => {
    this.setState({ currentDate: H.currentDate() });
  }

  render() {
    return <h1>Hello</h1>;
  }
}