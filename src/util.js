import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

// логика работы со временем
const DATE_FORMAT_FOR_EDIT = 'DD/MM/YY HH:mm';
const DATE_FORMAT_FOR_EVENT_DATE = 'MMM DD';
const DATE_FORMAT_FOR_EVENT_TIME = 'HH:mm';

const HOURES_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = MS_IN_SECOND * SECONDS_IN_MINUTE;
const MS_IN_HOUR = MS_IN_MINUTE * MINUTES_IN_HOUR;
const MS_IN_DAY = MS_IN_HOUR * HOURES_IN_DAY;

const getTimeGap = (dateFrom, dateTo) => {
  let timeGap = dayjs(dateTo).diff(dateFrom);
  if (timeGap >= MS_IN_DAY) {
    timeGap = dayjs(dayjs(dateTo).diff(dayjs(dateFrom))).utc().format('DD[d] HH[H] mm[M]');
  } else
  if (timeGap < MS_IN_DAY && timeGap >= MS_IN_HOUR) {
    timeGap = dayjs(dayjs(dateTo).diff(dayjs(dateFrom))).utc().format('HH[H] mm[M]');
  } else {
    timeGap = dayjs(dayjs(dateTo).diff(dayjs(dateFrom))).utc().format('mm[M]');
  }
  return timeGap;
};

const humanizeDateForEdit = (date) => date ? dayjs(date).utc().format(DATE_FORMAT_FOR_EDIT) : '';
const humanizeDateForEvent = (date) => date ? dayjs(date).utc().format(DATE_FORMAT_FOR_EVENT_DATE) : '';
const humanizeTimeFrom = (date) => date ? dayjs(date).utc().format(DATE_FORMAT_FOR_EVENT_TIME) : '';
const humanizeTimeTo = (date) => date ? dayjs(date).utc().format(DATE_FORMAT_FOR_EVENT_TIME) : '';


// другие утилитарные функции
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;

// console.log(humanizeDate('2019-07-10T22:55:56.845Z'));
export {getRandomArrayElement, getRandomInteger, humanizeDateForEdit, humanizeDateForEvent, humanizeTimeFrom, humanizeTimeTo, getTimeGap};
