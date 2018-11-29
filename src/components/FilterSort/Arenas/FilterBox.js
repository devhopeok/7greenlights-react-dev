import React, { PropTypes } from 'react';
import Filter from './Filter';
import { arenasFilters } from 'constants';
import { preventBoth } from '../../../utils/helpers';

const FilterBox = ({ enabled, toggleFilter, authenticated }) => {
  let filters = arenasFilters;
  if (!authenticated) {
    filters = filters.filter(x => x.name != 'greenlit');
  }

  return (
    <div className="filters-box">
      <div className="filter-list">
        {
          filters.map((filter, index) => {
            let isActive = enabled.indexOf(filter.id) !== -1;

            return (
              <Filter
                key={index}
                filter={filter}
                isActive={isActive}
                toggleFilter={(id) => preventBoth(id, enabled, toggleFilter)}
              />
            );
          }
          )
        }
      </div>
    </div>
  );
};

FilterBox.propTypes = {
  allArenas: PropTypes.array,
  enabled: PropTypes.array,
  toggleFilter: PropTypes.func,
  filterSortId: PropTypes.string,
  authenticated: PropTypes.bool,
};

export default FilterBox;
