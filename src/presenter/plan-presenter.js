import {render, replace} from '../framework/render.js';
import TripPlanView from '../view/plan-view.js';
import SortView from '../view/sort-view.js';
import TripEventView from '../view/event-view.js';
import TripEventsListView from '../view/events-list-view.js';
import TripEventEditView from '../view/event-edit-view.js';
import NoEventView from '../view/no-event-view.js';

export default class PlanPresenter {
  #planContainer = null;
  #eventsModel = null;

  #planComponent = new TripPlanView();
  #tripEventsListComponent = new TripEventsListView();

  #tripEvents = [];
  #tripDestinations = [];
  #tripOffers = [];

  constructor({planContainer, eventsModel}) {
    this.#planContainer = planContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#tripEvents = [...this.#eventsModel.tripEvents];
    this.#tripDestinations = [...this.#eventsModel.tripDestinations];
    this.#tripOffers = [...this.#eventsModel.tripOffers];

    this.#renderTripPlan();
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
      },
      onRollupButtonClick: () => {
        replaceRedactorToEvent();
      }
    });

    function replaceEventToRedactor() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceRedactorToEvent() {
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, this.#tripEventsListComponent.element);
  }

  #renderTripPlan() {
    render(this.#planComponent, this.#planContainer);

    if (!this.#tripEvents) {
      render(new NoEventView(), this.#planComponent.element);
      return;
    }

    render(new SortView(), this.#planComponent.element);
    render(this.#tripEventsListComponent, this.#planComponent.element);

    // логика отрисовки карточек ивентов
    for (let i = 0; i < this.#tripEvents.length; i++) {
      const event = this.#tripEvents[i];
      const eventDestination = this.#tripDestinations.find((dstntn) => dstntn.id === event.destination);
      const eventOffers = this.#tripOffers; // здесь передаем внутрь вообще все офферы
      this.#renderEvent({tripEvent: event, destination: eventDestination, offers: eventOffers});
    }
  }
}
