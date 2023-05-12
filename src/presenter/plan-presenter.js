import {render, RenderPosition} from '../framework/render.js';
import PlanView from '../view/plan-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from './event-presenter.js';

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
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventsListComponent.element,
    });
    eventPresenter.init({event, destination, offers});
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