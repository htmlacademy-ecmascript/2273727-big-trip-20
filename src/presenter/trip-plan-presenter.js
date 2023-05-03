import TripPlanView from '../view/trip-plan-view.js';
import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventEditView from '../view/trip-event-edit-view.js';
import {render} from '../render.js';

export default class TripPlanPresenter {
  tripPlanComponent = new TripPlanView();
  tripEventsListComponent = new TripEventsListView();

  constructor({tripPlanContainer, tripEventsModel}) {
    this.tripPlanContainer = tripPlanContainer;
    this.tripEventsModel = tripEventsModel;
  }

  init() {
    this.tripEvents = [...this.tripEventsModel.getTripEvents()];
    this.tripDestinations = [...this.tripEventsModel.getTripDestinations()];
    this.tripOffers = [...this.tripEventsModel.getTripOffers()];


    render(this.tripPlanComponent, this.tripPlanContainer);
    render(new SortView(), this.tripPlanComponent.getElement());
    render(this.tripEventsListComponent, this.tripPlanComponent.getElement());
    render(new TripEventEditView({tripEvent: this.tripEvents[0]}), this.tripEventsListComponent.getElement());

    for (let i = 0; i < this.tripEvents.length; i++) {
      const event = this.tripEvents[i];
      const eventDestination = this.tripDestinations.find((dstntn) => dstntn.id === event.destination);
      // const offers = this.tripEventsModel.getTripConcreteOffers(event.type); // это для редактирования ивента
      const eventOffers = this.tripEventsModel.mapIdToOffers(event.offers, event.type);

      render(new TripEventView({tripEvent: event, tripDestinations: eventDestination, tripOffers: eventOffers}), this.tripEventsListComponent.getElement());
    }

  }
}
