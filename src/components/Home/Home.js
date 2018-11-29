import React, { Component, PropTypes } from 'react';
import TopBanner from './TopBanner/TopBanner';
import ArenaHub from './ArenaHub/ArenaHub';
import Tooltip from 'components/Tooltip/Tooltip';
import { tooltipIds } from 'constants';

class Home extends Component {

  componentWillMount() {
    const { fetchArenas, arenasPage, arenaSort, arenaFilters,
      arenaSortOrder, toggleInHomepage } = this.props;

    let filtered = false;
    toggleInHomepage();
    fetchArenas(arenasPage, arenaFilters, arenaSort, arenaSortOrder[arenaSort], filtered);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fetchNextPage);
  }

  componentWillReceiveProps(nextProps) {
    const { arenaFilters, arenaSort, arenaSortOrder, fetchArenas,
      authenticated } = this.props;
    let filters = arenaFilters;
    let sort = arenaSort;
    let sortOrder = arenaSortOrder[sort];
    let hasChanged = false;
    let page = 1;
    let filtered = true;

    if (arenaFilters !== nextProps.arenaFilters) {
      filters = nextProps.arenaFilters;
      hasChanged = true;
    }

    if (arenaSort !== nextProps.arenaSort) {
      sort = nextProps.arenaSort;
      hasChanged = true;
    }

    if (arenaSortOrder !== nextProps.arenaSortOrder) {
      sortOrder = nextProps.arenaSortOrder[sort];
      hasChanged = true;
    }

    if (authenticated !== nextProps.authenticated) {
      hasChanged = true;
      filtered = false;
    }
    hasChanged && fetchArenas(page, filters, sort, sortOrder, filtered);
  }

  componentWillUnmount() {
    const { resetArenasPage, toggleInHomepage } = this.props;
    resetArenasPage();
    toggleInHomepage();
    window.removeEventListener('scroll', this.fetchNextPage);
  }

  fetchNextPage = () => {
    const { fetchArenas, arenasPage, arenaFilters, arenaSort,
      arenaSortOrder } = this.props;

    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      fetchArenas(arenasPage, arenaFilters, arenaSort, arenaSortOrder[arenaSort]);
    }
  }

  render() {
    const { user, fbLoginSuccess, igLoginSuccess, igLoginFailure, location,
      arenas, authenticated, greenlightArena, recentArenas,
      postedArenas } = this.props;

    let background = authenticated ? 'outerspace-bg' : 'aurora-bg';
    let allArenas = authenticated ? arenas : recentArenas.concat(arenas);

    return (
      <div className={`home-container full-page ${background}`}>
        <TopBanner
          user={user}
          fbLoginSuccess={fbLoginSuccess}
          igLoginSuccess={igLoginSuccess}
          igLoginFailure={igLoginFailure}
          location={location}
          authenticated={authenticated}
        />
        <div className={`arena-hub-bg ${authenticated ? '' : 'darkened-bg'}`}>
          <div className="main-centered">
            <div className="mobile-arena-tooltip has-tooltip">
              <Tooltip tooltipId={tooltipIds.homeArena} />
            </div>
            {
              authenticated &&
              <div className="featured-hubs">
                <ArenaHub
                  arenas={postedArenas}
                  title="Venues™ you have posted to"
                  greenlightArena={greenlightArena}
                  featured
                  hidden
                />
                <ArenaHub
                  arenas={recentArenas}
                  title="Recent Venues™"
                  isRecentArenasHub
                  greenlightArena={greenlightArena}
                  featured
                />
              </div>
            }
            <ArenaHub
              arenas={allArenas}
              title="All Venues™"
              displayFilterBox={true}
              greenlightArena={greenlightArena}
            />
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  fbLoginSuccess: PropTypes.func.isRequired,
  igLoginSuccess: PropTypes.func.isRequired,
  igLoginFailure: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  fetchArenas: PropTypes.func.isRequired,
  arenasPage: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
  resetArenasPage: PropTypes.func.isRequired,
  greenlightArena: PropTypes.func.isRequired,
  arenas: PropTypes.arrayOf(PropTypes.object),
  recentArenas: PropTypes.arrayOf(PropTypes.object),
  postedArenas: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
  arenaFilters: PropTypes.array,
  arenaSort: PropTypes.number,
  arenaSortOrder: PropTypes.array,
  toggleInHomepage: PropTypes.func.isRequired,
};

export default Home;
