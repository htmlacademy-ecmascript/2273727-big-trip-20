import { getMockEvent, mockDestinations, mockOffers } from '../mock/mock-objects';

const EVENTS_COUNT = 8;

export default class EventsModel {
  #tripEvents = Array.from({length: EVENTS_COUNT}, getMockEvent);

  get tripEvents() {
    return this.#tripEvents;
  }

  #tripDestinations = mockDestinations;

  get tripDestinations() {
    return this.#tripDestinations;
  }

  #tripOffers = mockOffers;

  get tripOffers() {
    return this.#tripOffers;
  }
}


