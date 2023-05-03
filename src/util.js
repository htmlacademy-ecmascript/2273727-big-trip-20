import dayjs from 'dayjs';

const DATE_FORMAT_FOR_EDIT = 'DD/MM/YY HH:mm';
const DATE_FORMAT_FOR_EVENT_DATE = 'MMM DD';
const DATE_FORMAT_FOR_EVENT_TIME = 'HH:mm';


const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;

const humanizeDateForEdit = (date) => date ? dayjs(date).format(DATE_FORMAT_FOR_EDIT) : '';
const humanizeDateForEvent = (date) => date ? dayjs(date).format(DATE_FORMAT_FOR_EVENT_DATE) : '';
const humanizeTimeFrom = (date) => date ? dayjs(date).format(DATE_FORMAT_FOR_EVENT_TIME) : '';
const humanizeTimeTo = (date) => date ? dayjs(date).format(DATE_FORMAT_FOR_EVENT_TIME) : '';

const date = new Date();

const utcOffset = date.getTimezoneOffset();
console.log(utcOffset);

// console.log(humanizeDate('2019-07-10T22:55:56.845Z'));
export {getRandomArrayElement, getRandomInteger, humanizeDateForEdit, humanizeDateForEvent, humanizeTimeFrom, humanizeTimeTo};
