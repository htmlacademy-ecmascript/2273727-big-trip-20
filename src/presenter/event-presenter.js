import {render, replace} from '../framework/render.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';

export default class EventPresenter {
  #eventsListContainer = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #destination = null;
  #offers = null;

  constructor({eventsListContainer}) {
    this.#eventsListContainer = eventsListContainer;
  }

  init({event, destination, offers}) {
    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;

    this.#eventComponent = new EventView({
      event: this.#event,
      destination: this.#destination,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
    });
    this.#eventEditComponent = new EventEditView({
      event: this.#event,
      destination: this.#destination,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onRollupButtonClick: this.#handleRollupButtonClick,
    });

    render(this.#eventComponent, this.#eventsListContainer);
  }

  #replaceEventToRedactor() {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceRedactorToEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceRedactorToEvent();
    }
  };

  #handleEditClick = () => {
    this.#replaceEventToRedactor();
  };

  #handleFormSubmit = () => {
    this.#replaceRedactorToEvent();
  };

  #handleRollupButtonClick = () => {
    this.#replaceRedactorToEvent();
  };
}
