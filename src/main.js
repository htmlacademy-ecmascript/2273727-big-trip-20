import { render, RenderPosition } from './framework/render.js';
import FilterView from './view/filter-view.js';
import TripInfoView from './view/info-view.js';
import TripInfoMainView from './view/info-main-view.js';
import TripInfoCostView from './view/info-cost-view.js';
import TripPlanPresenter from './presenter/plan-presenter.js';
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

const filters = generateFilter(tripEventsModel.tripEvents);

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
const tripInfoContainer = document.querySelector('.trip-main__trip-info');
render(new TripInfoMainView, tripInfoContainer);
render(new TripInfoCostView, tripInfoContainer);
render(new FilterView({filters}), filtersContainer);

tripPlanPresenter.init();
