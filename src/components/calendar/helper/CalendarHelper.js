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

export default class CalendarHelper {

  static currentDate() {
    return {
      day: moment().date(),
      month: moment().month(),
      year: moment().year(),
      dayOfWeek: moment().day()
    }
  }

  static numberOfDaysWeek() {
    return Object.keys(DAYS_WEEK).length;
  }

  static dayObjectsForMonth(month, daysAtEnd = null, daysAtStart = null) {
    const numberOfDays = moment().month(month).daysInMonth();
    let days = [...Array(numberOfDays).keys()].map(i => {
      return {
        index: null,
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
    return moment().month(month).startOf('month').day();
  }

  static dayOfWeekLastOfMonth(month) {
    return moment().month(month).endOf('month').day();
  }

  static numberOfRowsForMonthTable(month) {
    const weekLength = CalendarHelper.numberOfDaysWeek();
    const numberOfWeekFirstDayMonth = CalendarHelper.dayOfWeekFirstDayOfMonth(month);
    const totalNumberOfDays = numberOfWeekFirstDayMonth + moment().month(month).daysInMonth();
    return Math.ceil(totalNumberOfDays / weekLength);
  }

  static dayObjectsForMonthTable(month) {
    const weekLength = CalendarHelper.numberOfDaysWeek();
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

    return CalendarHelper.setIndexDayObjectsForTable([...daysPreviousMonth, ...daysMonth, ...daysNextMonth]);
  }

  static setIndexDayObjectsForTable(dayObjects) {
    return dayObjects.map((dayObj, i) => {
      dayObj.index = i;
      return dayObj;
    })
  }

  static getPreviousMonth(month) {
    return moment().month(month).subtract(1, 'months').month();
  }

  static getNextMonth(month) {
    return moment().month(month).add(1, 'months').month();
  }

  static getMonthName(month) {
    return moment().month(month).format('MMMM');
  }
}

export { DAYS_WEEK };