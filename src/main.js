import { render } from './framework/render.js';
import FilterView from './view/filter-view.js';
import TripPlanPresenter from './presenter/plan-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import TripEventsModel from './model/trip-events-model.js';
import { generateFilter } from './mock/filter.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const tripPlanContainer = document.querySelector('.trip-events');
const tripEventsModel = new TripEventsModel();

const tripPlanPresenter = new TripPlanPresenter({
  tripPlanContainer: tripPlanContainer,
  tripEventsModel,
});

const infoPresenter = new InfoPresenter({
  infoContainer: tripMainContainer,
  tripEventsModel,
});

infoPresenter.init();

const filters = generateFilter(tripEventsModel.tripEvents);
render(new FilterView({filters}), filtersContainer);

tripPlanPresenter.init();
