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

  get inactive() {
    return this.state === 'inactive';
  }
}

export default class CalendarHelper {

  constructor(dateTable) {
    this.dateTable = dateTable;
    this.today = moment();
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
    const weekLength = CalendarHelper.numberOfDaysWeek();
    const daysMonth = this.dayObjectsForMonth();
    let daysPreviousMonth = [], daysNextMonth = [];
    const dayOfWeekFirstDayOfMonth = this.dayOfWeekFirstDayOfMonth();
    const dayOfWeekLastDayOfMonth = this.dayOfWeekLastOfMonth();
    if (dayOfWeekFirstDayOfMonth > 0) {
      const previousMonth = this.getPreviousMonth();
      daysPreviousMonth = this.dayObjectsForMonth(previousMonth, dayOfWeekFirstDayOfMonth, null, true);
    }
    if (dayOfWeekLastDayOfMonth < weekLength - 1) {
      const nextMonth = this.getNextMonth();
      daysNextMonth = this.dayObjectsForMonth(nextMonth, null, weekLength - 1 - dayOfWeekLastDayOfMonth, true);
    }

    return this.setIndexDayObjectsForTable([...daysPreviousMonth, ...daysMonth, ...daysNextMonth]);
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