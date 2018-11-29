import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SortMedia from './SortMedia';
import FilterMedia from './FilterMedia';
import { changeSort, toggleFilter, toggleFilterByArena, toggleFilterByType,
toggleFilterByPops } from '../../../actions/filtersortActions';

let FilterSort = ({ id, changeSort, toggleFilter, filterList, sortList,
  toggleFilterByArena, toggleFilterByPops, toggleFilterByType, hasArena,
  hasPops, arenasList }) => {
  const enabledMediaList = sortList[id].enabled;
  return (
    <div className="media-filter-sort">
      <SortMedia
        enabled={enabledMediaList}
        sortOrder={sortList[id].sortOrder[enabledMediaList]}
        changeSort={(sortId) => changeSort(id, sortId)}
      />
      <FilterMedia
        enabled={filterList[id].enabled}
        arenasFilters={filterList[id].arenaIds}
        typeFilters={filterList[id].typeIds}
        popFilters={filterList[id].popIds}
        toggleFilter={(filterId) => toggleFilter(id, filterId)}
        toggleFilterByArena={(arenaId) => toggleFilterByArena(id, arenaId)}
        toggleFilterByType={(typeId) => toggleFilterByType(id, typeId)}
        toggleFilterByPops={(popId) => toggleFilterByPops(id, popId)}
        hasArena={hasArena}
        arenasList={arenasList}
        hasPops={hasPops}
      />
    </div>
  );
};

FilterSort.propTypes = {
  id: PropTypes.string.isRequired,
  filterList: PropTypes.object.isRequired,
  sortList: PropTypes.object.isRequired,
  changeSort: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  toggleFilterByArena: PropTypes.func,
  toggleFilterByType: PropTypes.func,
  toggleFilterByPops: PropTypes.func,
  hasArena: PropTypes.bool,
  hasPops: PropTypes.bool,
  arenasList: PropTypes.array,
};

FilterSort = connect(
  (state) => {
    return {
      filterList: state.filtersortReducer.filters,
      sortList: state.filtersortReducer.sorts,
    };
  },
  (dispatch) => {
    return {
      toggleFilter: (filterSortId, filterId) =>
        dispatch(toggleFilter(filterSortId, filterId)),
      changeSort: (filterSortId, sortId) =>
        dispatch(changeSort(filterSortId, sortId)),
      toggleFilterByArena: (filterSortId, arenaId) =>
        dispatch(toggleFilterByArena(filterSortId, arenaId)),
      toggleFilterByType: (filterSortId, typeId) =>
        dispatch(toggleFilterByType(filterSortId, typeId)),
      toggleFilterByPops: (filterSortId, popId) =>
        dispatch(toggleFilterByPops(filterSortId, popId)),
    };
  }
)(FilterSort);

export default FilterSort;
