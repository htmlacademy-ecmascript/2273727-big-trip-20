import FilterView from './view/filter-view.js';
import TripPlanPresenter from './presenter/trip-plan-presenter.js';
import {render} from './render.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripPlanContainer = document.querySelector('.trip-events');
const tripPlanPresenter = new TripPlanPresenter({tripPlanContainer: tripPlanContainer});

render(new FilterView(), filtersContainer);

tripPlanPresenter.init();
