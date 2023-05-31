import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const NoEventTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

function createNoEventTemplate(filterType, isEmpty) {
  let noEventText = NoEventTextType[filterType];
  if (isEmpty) {
    noEventText = NoEventTextType[FilterType.EVERYTHING];
  }
  return /*HTML*/ `<p class="trip-events__msg">${noEventText}</p>`;
}

export default class NoEventView extends AbstractView {
  #filterType = null;
  #isEmpty = null;

  constructor({filterType, isEmpty}) {
    super();
    this.#filterType = filterType;
    this.#isEmpty = isEmpty;
  }

  get template() {
    return createNoEventTemplate(this.#filterType, this.#isEmpty);
  }
}
