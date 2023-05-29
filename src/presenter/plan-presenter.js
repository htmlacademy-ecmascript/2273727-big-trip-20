import { render, RenderPosition } from '../framework/render.js';
import PlanView from '../view/plan-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from './event-presenter.js';
import { SortType } from '../const.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/event.js';

export default class PlanPresenter {
  #planContainer = null;
  #eventsModel = null;

  #planComponent = new PlanView();
  #eventsListComponent = new EventsListView();
  #sortComponent = null;
  #noEventComponent = new NoEventView();

  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({planContainer, eventsModel}) {
    this.#planContainer = planContainer;
    this.#eventsModel = eventsModel;
  }

  get events() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#eventsModel.events].sort(sortByDay);
      case SortType.TIME:
        return [...this.#eventsModel.events].sort(sortByTime);
      case SortType.PRICE:
        return [...this.#eventsModel.events].sort(sortByPrice);
    }

    return this.#eventsModel.events;
  }

  get destinations() {
    return this.#eventsModel.destinations;
  }

  get offers() {
    return this.#eventsModel.offers;
  }

  init() {
    this.#renderPlan();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {

    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventsList();
    this.#renderEventsList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#planComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderEvent({event, destinations, offers}) {
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventsListComponent.element,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange,
      destinations, offers,
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEvents(events, destinations, offers) {
    events
      .forEach((event) => this.#renderEvent({
        event,
        destinations: destinations,
        offers: offers}));
  }

  #renderNoEvents() {
    render(this.#noEventComponent, this.#planComponent.element, RenderPosition.AFTERBEGIN);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderEventsList() {
    const events = this.events;
    const destinations = this.destinations;
    const offers = this.offers;

    render(this.#eventsListComponent, this.#planComponent.element);
    this.#renderEvents(events, destinations, offers);
  }

  #renderPlan() {
    render(this.#planComponent, this.#planContainer);

    if (!this.events) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderEventsList();
  }
}
