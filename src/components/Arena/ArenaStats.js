import React, { PropTypes } from 'react';
import ArenaCounter from '../Home/ArenaHub/ArenaCounter';

const ArenaStats = ({ arena }) => (
  <div className="arena-stats-container">
    {
      arena.end_date &&
      <ArenaCounter
        endDate={arena.end_date}
        arenaId={arena.id}
        version="arena-page"
      />
    }
    <div className="arena-stats">
      <div className="arena-stat">
        <label className="stat-title">TOTAL POSTED</label>
        <label className="stat">{arena.media_content_count}</label>
      </div>
      <div className="arena-stat">
        <label className="stat-title">TOTAL GREENLIGHTS®</label>
        <label className="stat">{arena.media_contents_greenlights_count}</label>
      </div>
      <div className="arena-stat">
        <label className="stat-title">TOTAL NOTES™</label>
        <label className="stat">0</label>
      </div>
    </div>
  </div>
);

ArenaStats.propTypes = {
  arena: PropTypes.object.isRequired,
};

export default ArenaStats;
