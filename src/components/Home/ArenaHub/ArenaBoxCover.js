import React, { PropTypes } from 'react';
import Greenlight from '../../Greenlight/Greenlight';

const ArenaBoxCover = ({ image, greenlit, greenlightCount, greenlightAction }) => {
  let backgroundStyle = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className="arena-cover" style={image && backgroundStyle}>
      <div className={`arena-gradient ${greenlit ? 'gradient-greenlit' : ''}`}>
        <Greenlight
          greenlit={greenlit}
          counter={greenlightCount}
          greenlightAction={greenlightAction}
        />
      </div>
    </div>
  );
};

ArenaBoxCover.propTypes = {
  image: PropTypes.string,
  greenlightCount: PropTypes.number,
  greenlit: PropTypes.bool,
  greenlightAction: PropTypes.func.isRequired,
};

export default ArenaBoxCover;
