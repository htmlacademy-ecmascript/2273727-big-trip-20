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

    render(this.tripPlanComponent, this.tripPlanContainer);
    render(new SortView(), this.tripPlanComponent.getElement());
    render(this.tripEventsListComponent, this.tripPlanComponent.getElement());
    render(new TripEventEditView({tripEvent: this.tripEvents[0]}), this.tripEventsListComponent.getElement());

    for (let i = 0; i < this.tripEvents.length; i++) {
      render(new TripEventView({tripEvent: this.tripEvents[i]}), this.tripEventsListComponent.getElement());
    }

  }
}
