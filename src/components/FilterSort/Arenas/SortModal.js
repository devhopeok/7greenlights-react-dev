import React, { PropTypes } from 'react';
import * as constants from '../../../constants';

const SortModal = ({ enabled, changeSort, filterSortId }) => (
  <div
    className="sort-bubble"
  >
    <div className="sort-list">
      {
        constants.arenasSortingOptions.map((sorting) =>
          <button
            key={sorting.id}
            onClick={() => changeSort(filterSortId, sorting.id)}
            className= {(enabled == sorting.id) && 'active'}
          >
            {sorting.label}
          </button>
        )
      }
    </div>
  </div>
);

SortModal.propTypes = {
  filterSortId: PropTypes.string.isRequired,
  enabled: PropTypes.number,
  changeSort: PropTypes.func.isRequired,
};

export default SortModal;
