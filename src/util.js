import { dayjs } from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY hh:mm';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;

const humanizeDate = (date) => date ? dayjs(date).format(DATE_FORMAT) : '';


export {getRandomArrayElement, getRandomInteger, humanizeDate};
