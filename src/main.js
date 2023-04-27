import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import {render} from './render.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const boardContainer = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: boardContainer});

render(new FilterView(), filtersContainer);

boardPresenter.init();
