import Observable from '../framework/observable.js';
import { getMockEvent, mockDestinations, mockOffers } from '../mock/mock-objects';

const EVENTS_COUNT = 3;

export default class EventsModel extends Observable {
  #eventsApiService = null;
  #events = Array.from({length: EVENTS_COUNT}, getMockEvent);

  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;

    this.#eventsApiService.events.then((events) => {
      console.log(events.map(this.#adaptToClient));
    });

    this.#eventsApiService.destinations.then((destinations) => {
      console.log(destinations);
    });

    this.#eventsApiService.offers.then((offers) => {
      console.log(offers);
    });
  }

  get events() {
    return this.#events;
  }

  #destinations = mockDestinations;

  get destinations() {
    return this.#destinations;
  }

  #offers = mockOffers;

  get offers() {
    return this.#offers;
  }

  updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this.#events = [
      update,
      ...this.#events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient(event) {
    const adaptedEvent = {...event,
      basePrice: event['base_price'],
      dateFrom: event['date_from'],
      dateTo: event['date_to'],
      isFavorite: event['is_favorite'],
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}

