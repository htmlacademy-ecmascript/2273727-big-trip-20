import dayjs from 'dayjs';
import {createElement} from '../render.js';
import { humanizeDateForEvent, humanizeTimeFrom, humanizeTimeTo } from '../util.js';

function createTripEventTemplate(tripEvent, tripDestinations, tripOffers) {
  const {basePrice, dateFrom, dateTo, destination, isFavorite, offers, type} = tripEvent;

  const destenationObject = tripDestinations.find((dstntn) => dstntn.id === destination);
  // функция, вычленяющая из ВСЕХ вейпойнтов объект с нужным нам вейпойнтом через сравнение с ключом destination

  const offersObject = tripOffers.find((offer) => offer.type === type);
  // функция, вычленяющая из ВСЕХ офферов объект с нужными нами офферами через тайп

  const simpleDate = humanizeDateForEvent(dateFrom);
  const timeFrom = humanizeTimeFrom(dateFrom);
  const timeTo = humanizeTimeTo(dateTo);



  const time = dayjs(dateTo).diff(dayjs(dateFrom), 'm');

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime=${dateFrom}>${simpleDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/check-in.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destenationObject.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${dateFrom}>${timeFrom}</time>
          &mdash;
          <time class="event__end-time" datetime=${dateTo}>${timeTo}</time>
        </p>
        <p class="event__duration">${time}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">Add breakfast</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">50</span>
        </li>
      </ul>
      <button class="event__favorite-btn event__favorite-btn--active" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
}

export default class TripEventView {
  constructor({tripEvent, tripDestinations, tripOffers}) {
    this.tripEvent = tripEvent;
    this.tripDestinations = tripDestinations;
    this.tripOffers = tripOffers;
  }

  getTemplate() {
    return createTripEventTemplate(this.tripEvent, this.tripDestinations, this.tripOffers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
