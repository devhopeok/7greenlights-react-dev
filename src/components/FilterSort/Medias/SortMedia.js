import React, { PropTypes } from 'react';
import * as constants from '../../../constants';
import selectedIcon from './img/selected.png';
import notSelectedIcon from './img/not-selected.png';
import sortArrow from './img/sort-arrow.png';
import Tooltip from 'components/Tooltip/Tooltip';
import { tooltipIds } from 'constants';

/*
Arrow indicator should be to down the first time a new filter criteria is clicked (whatever the default criteria is, 0 or 1).
*/

const SortMedia = ({ enabled, changeSort, sortOrder }) => {
  const defaultOrderZero = (!sortOrder && (enabled % 2 == 0) && 'invert');
  const defaultOrderOne = (sortOrder && (enabled % 2 == 1) && 'invert');

  return (
    <div className="sort-media has-tooltip">
      <div className="sort-media-title">
        <h2>Sort by</h2>
        <img src={sortArrow} className={(defaultOrderZero || defaultOrderOne)}
        />
      </div>
      <div className="divider-line" />
      {
        constants.mediaSortingOptions.map(sorting => {
          let active = enabled == sorting.id;
          return (
            <div
              className="filter-sort-option"
              key={sorting.id}
            >
              <button onClick={() => changeSort(sorting.id)}>
                <img src={active ? selectedIcon : notSelectedIcon} />
              </button>
              <label>{sorting.label}</label>
            </div>
          );
        })
      }
      <Tooltip tooltipId={tooltipIds.myStreamFilters} />
    </div>
  );
};

SortMedia.propTypes = {
  enabled: PropTypes.number,
  sortOrder: PropTypes.number,
  changeSort: PropTypes.func.isRequired,
};

export default SortMedia;
