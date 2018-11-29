import React, { PropTypes } from 'react';
import tickedIcon from 'components/Arena/img/ticked.png';
import untickedIcon from 'components/Arena/img/unticked.png';
import selectedIcon from './img/selected.svg';
import nonSelectedIcon from './img/not-selected.svg';
import { arenasFiltersIds } from 'constants';

const Filter = ({ filter, isActive, toggleFilter }) => {

 const { id, label } = filter;
 const isGreenLightFilter = id == arenasFiltersIds.greenlit;

 const activeIcon = isGreenLightFilter ? tickedIcon : selectedIcon;
 const inactiveIcon = isGreenLightFilter ? untickedIcon : nonSelectedIcon;

  return (
    <div className="filter">
      { (id == arenasFiltersIds.featured || id == arenasFiltersIds.active) &&
        <div className="divider-line" />
      }
      <img
        src={isActive ? activeIcon : inactiveIcon}
        onClick={() => toggleFilter(id)}
      />
      <label>{label}</label>
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.object,
  isActive: PropTypes.bool,
  toggleFilter: PropTypes.func,
};

export default Filter;
