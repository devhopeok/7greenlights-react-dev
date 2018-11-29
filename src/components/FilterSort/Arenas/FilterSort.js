import React, { PropTypes } from 'react';
import SortModal from './SortModal';
import { connect } from 'react-redux';
import { toggleFilterBox, toggleSortModal, changeSort,
  toggleFilter } from '../../../actions/filtersortActions';
import FilterBox from './FilterBox';

let FilterSort = ({ id, filterList, toggleFilterBox, toggleSortModal, sortList,
  changeSort, toggleFilter, color = 'light', filter = true, sort = true,
  authenticated }) => {

  let isDark = color === 'dark';
  let sortVisible = sortList[id].visible;
  let filterVisible = filterList[id].visible;
  return (
    <div className="filter-sort">
      <div className={`filter-sort-container ${isDark && 'dark'}`}>
        {
          filter &&
          <button onClick={() => toggleFilterBox(id)}>Filters</button>
        }
        {
          filter && sort &&
          <div className="divider-line" />
        }
        {
          sort &&
          <div className="sort-container">
            <button onClick={() => toggleSortModal(id)}>Sort by</button>
            {
              sortVisible &&
              <SortModal
                enabled={sortList[id].enabled}
                changeSort={
                  (filterSortId, sortId) => {
                    changeSort(filterSortId, sortId);
                    toggleSortModal(id);
                  }
                }
                filterSortId={id}
              />
            }
          </div>
        }
      </div>
      {
        filterVisible &&
        <FilterBox
          enabled={filterList[id].enabled}
          toggleFilter={(filterId) => toggleFilter(id, filterId)}
          filterSortId={id}
          authenticated={authenticated}
        />
      }
    </div>
  );
};

FilterSort.propTypes = {
  id: PropTypes.string.isRequired,
  filterList: PropTypes.object.isRequired,
  sortList: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['light', 'dark']),
  filter: PropTypes.bool,
  sort: PropTypes.bool,
  displaySortModal: PropTypes.bool,
  toggleSortModal: PropTypes.func.isRequired,
  toggleFilterBox: PropTypes.func.isRequired,
  changeSort: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
};

FilterSort = connect(
  (state) => {
    return {
      filterList: state.filtersortReducer.filters,
      sortList: state.filtersortReducer.sorts,
      authenticated: state.loginReducer.authenticated,
    };
  },
  (dispatch) => {
    return {
      toggleFilterBox: (filterId) => dispatch(toggleFilterBox(filterId)),
      toggleSortModal: (sortId) => dispatch(toggleSortModal(sortId)),
      toggleFilter: (filterSortId, filterId) => dispatch(toggleFilter(filterSortId, filterId)),
      changeSort: (filterSortId, sortId) => dispatch(changeSort(filterSortId, sortId))
    };
  }
)(FilterSort);

export default FilterSort;
