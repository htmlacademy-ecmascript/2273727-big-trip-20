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


const mockOffers = [
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Switch seats',
        price: 80
      },
      {
        id: 3,
        title: 'Add meal',
        price: 100
      }
    ]
  },
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 320
      },
      {
        id: 2,
        title: 'Can smoke',
        price: 80
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a higher class',
        price: 50
      }
    ]
  }
];

function getMockTripEvent () {
  const type = getRandomArrayElement(WAYPOINT_TYPES);
  return {
    basePrice: getRandomInteger(50, 1000),
    dateFrom: new Date('2019-07-10T22:55:56.845Z'),
    dateTo: new Date('2019-07-11T11:22:13.375Z'),
    destination: createMockDestination(),
    isFavorite: Math.random() > 0.5,
    offers: mockOffers.find((offer) => offer.type === type),
    type: type,
  };
}

// НАДО РАЗНООБРАЗИТЬ МОКИ, СДЕЛАТЬ ПОБОЛЬШЕ ЭЛЕМЕНТОВ В МАССИВАХ;
export {getMockTripEvent};
