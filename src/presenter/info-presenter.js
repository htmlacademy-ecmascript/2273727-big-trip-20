import {render, RenderPosition} from '../framework/render.js';
import InfoView from '../view/info-view.js';

export default class InfoPresenter {
  #infoContainer = null;
  #eventsModel = null;

  #events = [];
  #destinations = [];
  #offers = [];

  constructor({infoContainer, eventsModel}) {
    this.#infoContainer = infoContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.tripEvents];
    this.#destinations = [...this.#eventsModel.tripDestinations];
    this.#offers = [...this.#eventsModel.tripOffers];

    this.#renderInfo();
  }

  #renderInfo() {
    render(new InfoView(this.#events, this.#destinations, this.#offers), this.#infoContainer, RenderPosition.AFTERBEGIN);
  }
}
