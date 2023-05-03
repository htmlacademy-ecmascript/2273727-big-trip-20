import { getMockTripEvent, mockTripDestinations, mockTripOffers } from '../mock/trip-event';

const EVENTS_COUNT = 4;

export default class TripEventsModel {
  tripEvents = Array.from({length: EVENTS_COUNT}, getMockTripEvent);

  getTripEvents() {
    return this.tripEvents;
  }

  tripDestinations = mockTripDestinations;

  getTripDestinations() {
    return this.tripDestinations;
  }

  tripOffers = mockTripOffers;

  getTripOffers() {
    return this.tripOffers;
  }
}


