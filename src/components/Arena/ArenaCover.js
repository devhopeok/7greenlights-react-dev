import React, { PropTypes } from 'react';
import Greenlight from '../Greenlight/Greenlight';
import ArenaStats from './ArenaStats';
import speakerIcon from '../Blast/img/green-speaker.png';

const ArenaCover = ({ arena, greenlightArena, toggleShareModal }) => {
  let background = {
    backgroundImage: `url(${arena.image})`
  };

  return (
    <div className="arena-cover-container" style={background}>
      <div className={`arena-cover-gradient ${arena.greenlit && 'greenlit'}`} />
      <div className="arena-cover-overlay" />
      <div className="arena-info-ontop">
        <div className="arena-top-bar">
          <img className="arena-icon" />
          <h1>{arena.name}</h1>
          <Greenlight
            counter={arena.greenlights_count}
            greenlit={arena.greenlit}
            greenlightAction={greenlightArena}
            noPadding={true}
          />
          <div className="divider-line"/>
          <button className="share-button" onClick={toggleShareModal}/>
        </div>
        <label className="arena-hashtag">{"#arena-slug"}</label>
        <div className="arena-blast-container">
          <img src={speakerIcon} />
          <label>{`"${arena.blast ? arena.blast : ''}"`}</label>
        </div>
        <p className="description">{arena.description}</p>
      </div>
      <div className="arena-sponsors">
        {
          arena.sponsors && arena.sponsors.map(sponsor =>
            <a
              key={sponsor.id}
              href={sponsor.url}
            >
                <img src={sponsor.picture}/>
            </a>
          )
        }
      </div>
      <div className="arena-info-ontop">
        <div className="divider-line"/>
        <ArenaStats arena={arena} />
      </div>
    </div>

  );
};

ArenaCover.propTypes = {
  arena: PropTypes.object.isRequired,
  greenlightArena: PropTypes.func.isRequired,
  toggleShareModal: PropTypes.func.isRequired,
};

export default ArenaCover;
