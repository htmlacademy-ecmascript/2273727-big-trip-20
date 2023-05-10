import { getMockTripEvent, mockTripDestinations, mockTripOffers } from '../mock/mock-objects';

const EVENTS_COUNT = 8;

export default class TripEventsModel {
  #tripEvents = Array.from({length: EVENTS_COUNT}, getMockTripEvent);

  get tripEvents() {
    return this.#tripEvents;
  }

  #tripDestinations = mockTripDestinations;

  get tripDestinations() {
    return this.#tripDestinations;
  }

  #tripOffers = mockTripOffers;

  get tripOffers() {
    return this.#tripOffers;
  }
}


