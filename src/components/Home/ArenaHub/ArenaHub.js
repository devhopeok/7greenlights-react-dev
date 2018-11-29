import React, { Component, PropTypes } from 'react';
import ArenaBox from './ArenaBox';
import ArenaHubHeader from './ArenaHubHeader';

class ArenaHub extends Component {
  render() {
    const { arenas, title, seeAll = false, greenlightArena, featured,
      displayFilterBox, isRecentArenasHub } = this.props;

    return (
      <div
        className={`arena-boxes-container ${ featured ? 'featured-boxes' : ''}`}
        style={
          featured &&
          { flex: arenas.length, display: ((!arenas.length) && 'none') }
        }
      >
        <ArenaHubHeader
          title={title}
          seeAll={seeAll}
          displayFilterBox={displayFilterBox}
        />
        {
          arenas.map((arena, index) => (
            <ArenaBox key={arena.id} arena={arena}
              greenlightArena={greenlightArena}
              shouldDisplayTooltip={isRecentArenasHub && index === 0}
            />
          ))
        }
        <div className="arena-container"/>
        { !featured && <div className="arena-container"/> }
        { !featured && <div className="arena-container"/> }
        { !featured && <div className="arena-container"/> }
      </div>
    );
  }
}

ArenaHub.propTypes = {
  arenas: PropTypes.array.isRequired,
  title: PropTypes.string,
  seeAll: PropTypes.bool,
  featured: PropTypes.bool,
  displayFilterBox: PropTypes.bool,
  greenlightArena: PropTypes.func.isRequired,
  isRecentArenasHub: PropTypes.bool,
};

export default ArenaHub;
