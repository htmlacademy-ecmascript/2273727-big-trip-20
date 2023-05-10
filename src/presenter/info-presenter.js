import {render, RenderPosition} from '../framework/render.js';
import InfoView from '../view/info-view.js';

export default class InfoPresenter {
  #infoContainer = null;
  #eventsModel = null;

  #tripEvents = [];
  #tripDestinations = [];
  #tripOffers = [];

  constructor({infoContainer, eventsModel}) {
    this.#infoContainer = infoContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#tripEvents = [...this.#eventsModel.tripEvents];
    this.#tripDestinations = [...this.#eventsModel.tripDestinations];
    this.#tripOffers = [...this.#eventsModel.tripOffers];

    this.#renderInfo();
  }

  #renderInfo() {
    render(new InfoView(this.#tripEvents, this.#tripDestinations, this.#tripOffers), this.#infoContainer, RenderPosition.AFTERBEGIN);
  }
}
