import moment from 'moment'

const DAYS_WEEK = {
  0: ["Sunday", "Su"],
  1: ["Monday", "Mo"],
  2: ["Tuesday", "Tu"],
  3: ["Wednesday", "We"],
  4: ["Thursday", "Th"],
  5: ["Friday", "Fr"],
  6: ["Saturday", "Sa"]
}

class Day {
  constructor(i, date) {
    this.index = null;
    this.day = i;
    this.date = moment(date).date(i + 1);
    this.state = 'active';
    this.info = {
      dayDisplay: i + 1,
      available: true
    };
  }

  setState = (state) => {
    this.state = state;
  }

  get active() {
    return this.state === 'active';
  }
}

export default class CalendarHelper {

  constructor(dateTable) {
    this.dateTable = dateTable;
  }

  setDateTable = (dateTable) => {
    this.dateTable = dateTable;
  }

  static numberOfDaysWeek() {
    return Object.keys(DAYS_WEEK).length;
  }

  dayObjectsForMonth(date = this.dateTable, daysAtEnd = null, daysAtStart = null, disable = false, x) {
    const numberOfDays = date.daysInMonth();
    let days = [...Array(numberOfDays).keys()].map(i => {
      return new Day(i, date);
    });
    if (daysAtEnd) {
      days = days.slice(days.length - daysAtEnd, days.length);
    } else if (daysAtStart) {
      days = days.slice(0, daysAtStart);
    }
    if (disable) {
      days.forEach(day => day.setState('inactive'));
    }
    return days;
  }

  setInactive = (date) => {

  }

  dayOfWeekFirstDayOfMonth() {
    return moment(this.dateTable).startOf('month').day();
  }

  dayOfWeekLastOfMonth() {
    return moment(this.dateTable).endOf('month').day();
  }

  numberOfRowsForMonthTable() {
    const weekLength = CalendarHelper.numberOfDaysWeek();
    const numberOfWeekFirstDayMonth = this.dayOfWeekFirstDayOfMonth();
    const totalNumberOfDays = numberOfWeekFirstDayMonth + this.dateTable.daysInMonth();

    return Math.ceil(totalNumberOfDays / weekLength);
  }

  dayObjectsForMonthTable() {
    const daysMonth = this.dayObjectsForMonth();
    const dayOfWeekFirstDayOfMonth = this.dayOfWeekFirstDayOfMonth();
    const dayOfWeekLastDayOfMonth = this.dayOfWeekLastOfMonth();
    const [daysPreviousMonth, daysNextMonth] = this.getDisabledDaysForTable(dayOfWeekFirstDayOfMonth, dayOfWeekLastDayOfMonth);

    return this.setIndexDayObjectsForTable([...daysPreviousMonth, ...daysMonth, ...daysNextMonth]);
  }

  getDisabledDaysForTable(numDaysPreviousMonth, numDaysNextMonth) {
    const weekLength = CalendarHelper.numberOfDaysWeek();
    let daysPreviousMonth = [], daysNextMonth = [];
    if (numDaysPreviousMonth > 0) {
      const previousMonth = this.getPreviousMonth();
      daysPreviousMonth = this.dayObjectsForMonth(previousMonth, numDaysPreviousMonth, null, true);
    }
    if (numDaysNextMonth < weekLength - 1) {
      const nextMonth = this.getNextMonth();
      daysNextMonth = this.dayObjectsForMonth(nextMonth, null, weekLength - 1 - numDaysNextMonth, true);
    }
    return [daysPreviousMonth, daysNextMonth];
  }

  setIndexDayObjectsForTable(dayObjects) {
    return dayObjects.map((dayObj, i) => {
      dayObj.index = i;
      return dayObj;
    })
  }

  getPreviousMonth() {
    return moment(this.dateTable).subtract(1, 'month');
  }

  getNextMonth() {
    return moment(this.dateTable).add(1, 'month');
  }

  getMonthDisplay() {
    return this.dateTable.format('MMMM');
  }

  getYearDisplay() {
    return this.dateTable.format('YYYY');
  }
}

export { DAYS_WEEK };