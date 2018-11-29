import React, { PropTypes } from 'react';
import ArenaBoxCover from './ArenaBoxCover';
import ArenaCounter from './ArenaCounter';
import { browserHistory } from 'react-router';
import { tooltipIds } from 'constants';
import Tooltip from 'components/Tooltip/Tooltip';

const ArenaBox = ({ arena, greenlightArena, shouldDisplayTooltip }) => {
  const hasTooltipClass = shouldDisplayTooltip ? 'has-tooltip' : '';
  return (
    <div
      className={`arena-container pointer ${hasTooltipClass}`}
      onClick={() => browserHistory.push(`/arena/${arena.id}`)}
    >
      {
        shouldDisplayTooltip &&
        <Tooltip tooltipId={tooltipIds.homeGreenlight} />
      }
      <ArenaBoxCover
        greenlit={arena.greenlit}
        greenlightCount={arena.greenlights_count}
        image={arena.image_thumbnail}
        greenlightAction={() => greenlightArena(arena.id)}
      />
      <div className="arena-name pointer"><label>{arena.name}</label></div>
      <div className="arena-divider-line" />
      <ArenaCounter
        endDate={arena.end_date}
        arenaId={arena.id}
      />
    </div>
  );
};

ArenaBox.propTypes = {
  arena: PropTypes.object.isRequired,
  greenlightArena: PropTypes.func.isRequired,
  shouldDisplayTooltip: PropTypes.bool,
};

export default ArenaBox;
