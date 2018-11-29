import * as types from './actionTypes';

export function toggleFilterBox(filterId) {
  return {
    type: types.TOGGLE_FILTER_BOX,
    filterId,
  };
}

export function toggleSortModal(sortId) {
  return {
    type: types.TOGGLE_SORT_MODAL,
    sortId,
  };
}

export function changeSort(filtersortId, newSortCriteria) {
  return {
    type: types.CHANGE_SORT,
    filtersortId,
    newSortCriteria,
  };
}

export function toggleFilter(filtersortId, newFilter) {
  return {
    type: types.TOGGLE_FILTER,
    filtersortId,
    newFilter,
  };
}

export function toggleFilterByArena(filtersortId, arenaId) {
  return {
    type: types.TOGGLE_FILTER_BY_ARENA,
    filtersortId,
    arenaId,
  };
}

export function toggleFilterByType(filtersortId, typeId) {
  return {
    type: types.TOGGLE_FILTER_BY_TYPE,
    filtersortId,
    typeId,
  };
}

export function toggleFilterByPops(filtersortId, popId) {
  return {
    type: types.TOGGLE_FILTER_BY_POPS,
    filtersortId,
    popId,
  };
}

export function resetFilters() {
  return { type: types.RESET_FILTERS };
}
