import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, isChecked) {
  const {type, count} = filter;

  return (
    /*HTML*/ `<div class="trip-filters__filter">
        <input
          id="filter-${type}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          ${isChecked ? 'checked' : ''}
          ${count === 0 ? 'disabled' : ''}
        >
        <label
          class="trip-filters__filter-label"
          for="filter-${type}"
        >${type} ${count}</label>
    </div>` // ! ОСТАВИЛ ОТОБРАЖЕНИЕ ЦИФР ДЛЯ НАГЛЯДНОСТИ ФИЛЬТРОВ, НУЖНО НЕ ЗАБЫТЬ УДАЛИТЬ ПЕРЕД СДАЧЕЙ ПРОЕКТА
  );
}

function createFilterTemplate(filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
        ${filterItemsTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
}


export default class FilterView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template () {
    return createFilterTemplate(this.#filters);
  }
}