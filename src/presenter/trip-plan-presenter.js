import {render, replace} from '../framework/render.js';
import TripPlanView from '../view/trip-plan-view.js';
import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventEditView from '../view/trip-event-edit-view.js';

export default class TripPlanPresenter {
  #tripPlanContainer = null;
  #tripEventsModel = null;

  #tripPlanComponent = new TripPlanView();
  #tripEventsListComponent = new TripEventsListView();

  #tripEvents = [];
  #tripDestinations = [];
  #tripOffers = [];

  constructor({tripPlanContainer, tripEventsModel}) {
    this.#tripPlanContainer = tripPlanContainer;
    this.#tripEventsModel = tripEventsModel;
  }

  init() {
    this.#tripEvents = [...this.#tripEventsModel.tripEvents];
    this.#tripDestinations = [...this.#tripEventsModel.tripDestinations];
    this.#tripOffers = [...this.#tripEventsModel.tripOffers];

    render(this.#tripPlanComponent, this.#tripPlanContainer);
    render(new SortView(), this.#tripPlanComponent.element);
    render(this.#tripEventsListComponent, this.#tripPlanComponent.element);

    // логика отрсиовки редактора
    // const redactingEvent = this.#tripEvents[0];
    // const destination = this.#tripDestinations.find((dstntn) => dstntn.id === redactingEvent.destination);

    // render(new TripEventEditView({tripEvent: redactingEvent, destination: destination, offers: this.#tripOffers}), this.#tripEventsListComponent.element);

    // логика отрисовки карточек ивентов
    for (let i = 0; i < this.#tripEvents.length; i++) {
      const event = this.#tripEvents[i];
      const eventDestination = this.#tripDestinations.find((dstntn) => dstntn.id === event.destination);
      const eventOffers = this.#tripEventsModel.mapIdToOffers(event.offers, event.type);

      this.#renderEvent({tripEvent: event, destination: eventDestination, offers: eventOffers});
    }
  }

  #renderEvent({tripEvent, destination, offers}) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceRedactorToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventComponent = new TripEventView({
      tripEvent,
      destination,
      offers,
      onEditClick: () => {
        replaceEventToRedactor();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const eventEditComponent = new TripEventEditView({
      tripEvent,
      destination,
      offers,
      onFormSubmit: () => {
        replaceRedactorToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceEventToRedactor() {
      replace(eventComponent, eventEditComponent);
    }

    function replaceRedactorToEvent() {
      replace(eventEditComponent, eventComponent);
    }

    render(eventComponent, this.#tripEventsListComponent.element);
  }
}
