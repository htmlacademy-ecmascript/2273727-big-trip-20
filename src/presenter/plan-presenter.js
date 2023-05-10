import {render, replace} from '../framework/render.js';
import PlanView from '../view/plan-view.js';
import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import NoEventView from '../view/no-event-view.js';

export default class PlanPresenter {
  #planContainer = null;
  #eventsModel = null;

  #planComponent = new PlanView();
  #tripEventsListComponent = new EventsListView();

  #events = [];
  #destinations = [];
  #offers = [];

  constructor({planContainer, eventsModel}) {
    this.#planContainer = planContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.tripEvents];
    this.#destinations = [...this.#eventsModel.tripDestinations];
    this.#offers = [...this.#eventsModel.tripOffers];

    this.#renderPlan();
  }

  #renderEvent({tripEvent, destination, offers}) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceRedactorToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventComponent = new EventView({
      tripEvent,
      destination,
      offers,
      onEditClick: () => {
        replaceEventToRedactor();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const eventEditComponent = new EventEditView({
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

  #renderPlan() {
    render(this.#planComponent, this.#planContainer);

    if (!this.#events) {
      render(new NoEventView(), this.#planComponent.element);
      return;
    }

    render(new SortView(), this.#planComponent.element);
    render(this.#tripEventsListComponent, this.#planComponent.element);

    // логика отрисовки карточек ивентов
    for (let i = 0; i < this.#events.length; i++) {
      const event = this.#events[i];
      const eventDestination = this.#destinations.find((dstntn) => dstntn.id === event.destination);
      const eventOffers = this.#offers; // здесь передаем внутрь вообще все офферы
      this.#renderEvent({tripEvent: event, destination: eventDestination, offers: eventOffers});
    }
  }
}
