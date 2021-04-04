import moment from 'moment'

const DAYS_WEEK = {
  0: ["Sunday", "S"],
  1: ["Monday", "M"],
  2: ["Tuesday", "T"],
  3: ["Wednesday", "w"],
  4: ["Thursday", "T"],
  5: ["Friday", "F"],
  6: ["Saturday", "S"]
}

export default class CalendarHelper {

  static currentDate() {
    return {
      day: moment().date(),
      month: moment().month(),
      year: moment().year(),
      dayOfWeek: moment().day()
    }
  }

  static dayObjectsForMonth(month, daysAtEnd = null, daysAtStart = null) {
    const numberOfDays = moment().month(month).daysInMonth();
    let days = [...Array(numberOfDays).keys()].map(i => {
      return {
        day: i,
        month,
        state: 'active',
        info: {
          dayDisplay: i + 1,
          available: true
        }
      }
    });
    if (daysAtEnd) {
      days = days.slice(days.length - daysAtEnd, days.length);
    } else if (daysAtStart) {
      days = days.slice(0, daysAtStart);
    }
    return days;
  }

  static dayOfWeekFirstDayOfMonth(month) {
    return moment().month(month).date(0).day();
  }

  static dayOfWeekLastOfMonth(month) {
    return moment().month(month).endOf('month').day();
  }

  static numberOfRowsForMonthTable(month) {
    const weekLength = Object.keys(DAYS_WEEK).length;
    const numberOfWeekFirstDayMonth = CalendarHelper.dayOfWeekFirstDayOfMonth(month);
    const totalNumberOfDays = numberOfWeekFirstDayMonth + moment.month(month).daysInMonth();
    const numberOfRows = Math(totalNumberOfDays / weekLength).ceil();
    return numberOfRows;
  }

  static dayObjectsForMonthTable(month) {
    const weekLength = Object.keys(DAYS_WEEK).length;
    const daysMonth = CalendarHelper.dayObjectsForMonth(month);
    let daysPreviousMonth = [], daysNextMonth = [];
    const dayOfWeekFirstDayOfMonth = CalendarHelper.dayOfWeekFirstDayOfMonth(month);
    const dayOfWeekLastDayOfMonth = CalendarHelper.dayOfWeekLastOfMonth(month);
    if (dayOfWeekFirstDayOfMonth > 0) {
      const previousMonth = moment().month(month).subtract(1, 'months').month();
      daysPreviousMonth = CalendarHelper.dayObjectsForMonth(previousMonth, dayOfWeekFirstDayOfMonth);
    }
    if (dayOfWeekLastDayOfMonth < weekLength - 1) {
      const nextMonth = moment().month(month).add(1, 'months').month();
      daysNextMonth = CalendarHelper.dayObjectsForMonth(nextMonth, null, (weekLength - 1 - dayOfWeekLastDayOfMonth));
    }

    return [...daysPreviousMonth, ...daysMonth, ...daysNextMonth];
  }
}