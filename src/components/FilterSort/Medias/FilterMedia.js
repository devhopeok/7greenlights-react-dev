import React, { PropTypes } from 'react';
import * as constants from '../../../constants';
import { toggleAuthModal } from '../../../actions/commonActions';
import { connect } from 'react-redux';
import untickedIcon from './img/unticked.png';
import tickedIcon from './img/ticked.png';
import popsAIcon from './img/pops-a.png';
import popsBIcon from './img/pops-b.png';
import popsCIcon from './img/pops-c.png';
import popsAIconOn from './img/pops-a-on.png';
import popsBIconOn from './img/pops-b-on.png';
import popsCIconOn from './img/pops-c-on.png';
import popsDIcon from './img/pops-d.png';
import selectedIcon from './img/selected.png';
import notSelectedIcon from './img/not-selected.png';

const FilterMedia = ({ typeFilters, popFilters, toggleFilterByType, arenasList,
  arenasFilters, toggleFilterByArena, hasArena, hasPops, toggleFilterByPops,
  authenticated, toggleAuthModal }) => {

  return (
    <div className="filter-media">
      <h2>Filter by Content</h2>
      <div className="divider-line" />
      {
        constants.mediaTypeFilters.map(filter => {
          let active = typeFilters.indexOf(filter.id) !== -1;
          return (
            <div
              className="filter-sort-option"
              key={filter.id}
            >
              <button onClick={() => toggleFilterByType(filter.id)}>
                <img src={active ? tickedIcon : untickedIcon} />
              </button>
              <label>{filter.label}</label>
            </div>
          );
        })
      }
      { Boolean(hasArena && arenasList.length) && <h2>Filter by Venue™</h2> }
      {
        Boolean(hasArena && arenasList.length) &&
        <div className="divider-line" />
      }
      {
        hasArena && arenasList.map(arena => {
          let active = arenasFilters.indexOf(arena.id) !== -1;
          return (
            <div
              className="filter-sort-option"
              key={arena.id}
            >
              <button onClick={() => toggleFilterByArena(arena.id)}>
                <img src={active ? tickedIcon : untickedIcon} />
              </button>
              <label>{arena.name}</label>
            </div>
          );
        })
      }
      { hasPops && <h2>Filter by Pops</h2> }
      { hasPops && <div className="divider-line" /> }
      {
        hasPops && constants.popsFilters.map(pop => {
          let active = popFilters.indexOf(pop.id) !== -1;
          let icon;
          let text;
          switch (pop.name) {
            case 'pops-a': {
              icon = active ? popsAIconOn : popsAIcon;
              text = 'Exchanged GreenLights®';
              break;
            }
            case 'pops-b': {
              icon = active ? popsBIconOn : popsBIcon;
              text = 'GreenLit® them';
              break;
            }
            case 'pops-c': {
              icon = active ? popsCIconOn : popsCIcon;
              text = 'GreenLit® by them';
              break;
            }
            case 'pops-d': {
              icon = popsDIcon;
              text = 'No GreenLights®';
            }
          }

          return (
            <div
              className="filter-sort-option pop"
              key={pop.id}
            >
              <button onClick={() =>
                  authenticated ? toggleFilterByPops(pop.id) : toggleAuthModal()
              }>
                <img src={active ? selectedIcon : notSelectedIcon} />
              </button>
              <img className="pop-icon" src={icon} />
              <label>{text}</label>
            </div>
          );
        })
      }
    </div>
  );
};

FilterMedia.propTypes = {
  enabled: PropTypes.array,
  toggleFilter: PropTypes.func.isRequired,
  arenasList: PropTypes.array,
  arenasEnabled: PropTypes.array,
  arenasFilters: PropTypes.array,
  typeFilters: PropTypes.array,
  popFilters: PropTypes.array,
  toggleFilterByArena: PropTypes.func,
  toggleFilterByType: PropTypes.func,
  toggleFilterByPops: PropTypes.func,
  hasArena: PropTypes.bool,
  hasPops: PropTypes.bool,
  authenticated: PropTypes.bool,
  toggleAuthModal: PropTypes.func.isRequired,
};

const mapStateToProps = ({ loginReducer }) => ({
  authenticated: loginReducer.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  toggleAuthModal: () => dispatch(toggleAuthModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterMedia);
