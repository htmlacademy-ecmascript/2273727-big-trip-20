import {render, replace, remove} from '../framework/render.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';

export default class EventPresenter {
  #eventsListContainer = null;
  #handleDataChange = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #destination = null;
  #offers = null;

  constructor({eventsListContainer, onDataChange, destination, offers}) {
    this.#eventsListContainer = eventsListContainer;
    this.#handleDataChange = onDataChange;

    this.#destination = destination;
    this.#offers = offers;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      destination: this.#destination,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });
    this.#eventEditComponent = new EventEditView({
      event: this.#event,
      destination: this.#destination,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onRollupButtonClick: this.#handleRollupButtonClick,
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventsListContainer);
      return;
    }

    if (this.#eventsListContainer.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#eventsListContainer.contains(prevEventEditComponent.element)) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
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

  #handleRollupButtonClick = () => {
    this.#replaceRedactorToEvent();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#event, isFavorite: !this.#event.isFavorite});
  };

  #handleFormSubmit = (event) => {
    this.#handleDataChange(event);
    this.#replaceRedactorToEvent();
  };
}
