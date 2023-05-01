import { getRandomArrayElement, getRandomInteger } from '../util';
import { WAYPOINT_TYPES, DESTINATIONS_DESCRIPTIONS, DESTINATIONS_NAMES } from '../const';

const createMockDestination = () => ({
  description: getRandomArrayElement(DESTINATIONS_DESCRIPTIONS),
  name: getRandomArrayElement(DESTINATIONS_NAMES),
  pictures: Array.from({length: getRandomInteger(1, 5)}, () => ({
    src: `https://loremflickr.com/248/152?random=${getRandomInteger(1,30)}`,
    description: getRandomArrayElement(DESTINATIONS_DESCRIPTIONS)
  }))
});


const createMockOffer = () => ({
  type: getRandomArrayElement(WAYPOINT_TYPES),
  offers:
    {
      title: 'Upgrade to a business class',
      price: 120
    }
});


const getMockTripEvent = () => ({
  basePrice: getRandomInteger(50, 1000),
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: createMockDestination(),
  isFavorite: Math.random() > 0.5,
  offers: createMockOffer(),
  type: getRandomArrayElement(WAYPOINT_TYPES),
});

// НАДО РАЗНООБРАЗИТЬ МОКИ, СДЕЛАТЬ ПОБОЛЬШЕ ЭЛЕМЕНТОВ В МАССИВАХ;
export {getMockTripEvent};
