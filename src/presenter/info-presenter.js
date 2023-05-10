import {render, RenderPosition} from '../framework/render.js';
import InfoView from '../view/info-view.js';

export default class InfoPresenter {
  #infoContainer = null;
  #tripEventsModel = null;

  #tripEvents = [];
  #tripDestinations = [];
  #tripOffers = [];

  constructor({infoContainer, tripEventsModel}) {
    this.#infoContainer = infoContainer;
    this.#tripEventsModel = tripEventsModel;
  }

  init() {
    this.#tripEvents = [...this.#tripEventsModel.tripEvents];
    this.#tripDestinations = [...this.#tripEventsModel.tripDestinations];
    this.#tripOffers = [...this.#tripEventsModel.tripOffers];

    this.#renderInfo();
  }

  #renderInfo() {
    render(new InfoView(this.#tripEvents, this.#tripDestinations, this.#tripOffers), this.#infoContainer, RenderPosition.AFTERBEGIN);
  }
}
