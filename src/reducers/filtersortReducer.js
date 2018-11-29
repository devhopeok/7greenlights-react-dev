import * as types from 'actions/actionTypes';
import { arenasFiltersIds } from 'constants';

/*
Order option:
0 --> from smallest to greatest, 1 --> the opposite.
Note:
Positions in the mediaList array map to media sorting options.
*/

const initialState = {
  filters: {
    allArenas: { visible: false, enabled: [arenasFiltersIds.nonFeatured, arenasFiltersIds.archived] },
    mediaList: { enabled: [], arenaIds: [], popIds: [], typeIds: [] },
  },
  sorts: {
    allArenas: { visible: false, enabled: 1, sortOrder: [1, 1, 0, 0], defaultSortOrder: [1, 1, 0, 0] },
    mediaList: { enabled: 1, sortOrder: [0, 1, 0, 1], defaultSortOrder: [0, 1, 0, 1] },
  }
};

export default function filtersortReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOGGLE_FILTER_BOX: {
      let id = action.filterId;
      let newFilters = { ...state.filters };
      if (newFilters[id]) {
        newFilters[id].visible = !newFilters[id].visible;
      }
      return {
        ...state,
        filters: newFilters,
      };
    }
    case types.TOGGLE_SORT_MODAL: {
      let id = action.sortId;
      let newSorts = { ...state.sorts };
      if (newSorts[id]) {
        newSorts[id].visible = !newSorts[id].visible;
      }
      return {
        ...state,
        sorts: newSorts,
      };
    }
    case types.CHANGE_SORT: {
      let filtersortId = action.filtersortId;
      let newSortCriteria = action.newSortCriteria;

      let newSortOrder = [...state.sorts[filtersortId].sortOrder];

      if (state.sorts[filtersortId].enabled == newSortCriteria) {
        newSortOrder[newSortCriteria] = (newSortOrder[newSortCriteria] == 0) ? 1 : 0;
      } else {
        newSortOrder[newSortCriteria] = state.sorts[filtersortId].defaultSortOrder[newSortCriteria];
      }

      return {
          ...state,
             sorts: {
               ...state.sorts,
               [action.filtersortId]: {
                 ...state.sorts[action.filtersortId],
                 enabled: newSortCriteria,
                 sortOrder: newSortOrder
               }
            }
        };
    }
    case types.TOGGLE_FILTER: {
      let filtersortId = action.filtersortId;
      let newFilter = action.newFilter;
      let newFiltersObject = { ...state.filters };
      let index = newFiltersObject[filtersortId].enabled.indexOf(newFilter);
      let newEnabledFilters = newFiltersObject[filtersortId].enabled.slice();
      if (index === -1) {
        newEnabledFilters.push(newFilter);
      } else {
        newEnabledFilters.splice(index, 1);
      }
      newFiltersObject[filtersortId].enabled = newEnabledFilters;

      return {
        ...state,
        filters: newFiltersObject,
      };
    }
    case types.TOGGLE_FILTER_BY_ARENA: {
      let arenaId = action.arenaId;
      let newFiltersObject = { ...state.filters };
      let index = newFiltersObject['mediaList'].arenaIds.indexOf(arenaId);
      let newArenasList = newFiltersObject['mediaList'].arenaIds.slice();
      if (index === -1) {
        newArenasList.push(arenaId);
      } else {
        newArenasList.splice(index, 1);
      }
      newFiltersObject['mediaList'].arenaIds = newArenasList;
      return {
        ...state,
        filters: newFiltersObject,
      };
    }
    case types.TOGGLE_FILTER_BY_TYPE: {
      let typeId = action.typeId;
      let newFiltersObject = { ...state.filters };
      let index = newFiltersObject['mediaList'].typeIds.indexOf(typeId);
      let newTypesList = newFiltersObject['mediaList'].typeIds.slice();
      if (index === -1) {
        newTypesList.push(typeId);
      } else {
        newTypesList.splice(index, 1);
      }
      newFiltersObject['mediaList'].typeIds = newTypesList;
      return {
        ...state,
        filters: newFiltersObject,
      };
    }
    case types.TOGGLE_FILTER_BY_POPS: {
      let popId = action.popId;
      let newFiltersObject = { ...state.filters };
      newFiltersObject['mediaList'].popIds = [popId];

      return {
        ...state,
        filters: newFiltersObject,
      };
    }
    case types.RESET_FILTERS: {
      const initialMediaFilters =
        { enabled: [], arenaIds: [], popIds: [], typeIds: [] };
      const initialMediaSorts = { enabled: 1, sortOrder: [0, 1, 0, 1], defaultSortOrder: [0, 1, 0, 1] };

      return {
        ...state,
        filters: { ...state.filters, mediaList: initialMediaFilters },
        sorts: { ...state.sorts, mediaList: initialMediaSorts }
      };
    }
    default:
      return state;
  }
}
