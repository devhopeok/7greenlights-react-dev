import React, { PropTypes } from 'react';
import FilterSort from '../../FilterSort/Arenas/FilterSort';

const ArenaHubHeader = ({ title, seeAll = false, displayFilterBox = false }) => {
  return (
    <div className="arena-hub-header">
      <h2 className="header-title"> { title } { seeAll && <a>SEE ALL</a> } </h2>
      {
        displayFilterBox &&
        <FilterSort id="allArenas" />
      }
    </div>
  );
};

ArenaHubHeader.propTypes = {
  title: PropTypes.string,
  seeAll: PropTypes.bool,
  displayFilterBox: PropTypes.bool,
};

export default ArenaHubHeader;
