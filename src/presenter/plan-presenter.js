import {render, RenderPosition, replace} from '../framework/render.js';
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
  #eventsListComponent = new EventsListView();
  #sortComponent = new SortView();
  #noEventComponent = new NoEventView();

  #events = [];
  #destinations = [];
  #offers = [];

  constructor({planContainer, eventsModel}) {
    this.#planContainer = planContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#destinations = [...this.#eventsModel.destinations];
    this.#offers = [...this.#eventsModel.offers];

    this.#renderPlan();
  }

  #renderSort() {
    render(this.#sortComponent, this.#planComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderEvent({event, destination, offers}) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceRedactorToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventComponent = new EventView({
      event,
      destination,
      offers,
      onEditClick: () => {
        replaceEventToRedactor();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const eventEditComponent = new EventEditView({
      event,
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

    render(eventComponent, this.#eventsListComponent.element);
  }

  #renderEvents() {
    this.#events
      .forEach((event) => this.#renderEvent({
        event,
        destination: this.#destinations.find((dstntn) => dstntn.id === event.destination),
        offers: this.#offers}));
  }

  #renderNoEvents() {
    render(this.#noEventComponent, this.#planComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderEventsList() {
    render(this.#eventsListComponent, this.#planComponent.element);
    this.#renderEvents();
  }

  #renderPlan() {
    render(this.#planComponent, this.#planContainer);

    if (!this.#events) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderEventsList();
  }
}
