import { connect } from 'react-redux';
import Home from '../components/Home/Home';
import { fbLoginSuccess, igLoginSuccess, socialLoginError }
from '../actions/signupActions';
import { toggleAuthModal, toggleInHomepage } from '../actions/commonActions';
import { fetchArenas, resetArenasPage } from '../actions/arenaActions';
import { greenlightArena } from '../actions/greenlightActions';

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
    authenticated: state.loginReducer.authenticated,
    arenasPage: state.arenasReducer.arenasPage,
    arenas: state.arenasReducer.arenas,
    recentArenas: state.arenasReducer.recentArenas,
    postedArenas: state.arenasReducer.postedArenas,
    arenaFilters: state.filtersortReducer.filters['allArenas'].enabled,
    arenaSort: state.filtersortReducer.sorts['allArenas'].enabled,
    arenaSortOrder: state.filtersortReducer.sorts['allArenas'].sortOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fbLoginSuccess: response => dispatch(fbLoginSuccess(response)),
    igLoginSuccess: response => dispatch(igLoginSuccess(response)),
    igLoginFailure: error => dispatch(socialLoginError(error)),
    fetchArenas: (page, filters, sortType, sortOrder, filtered) => {
      dispatch(fetchArenas(page, filters, sortType, sortOrder, filtered));
    },
    resetArenasPage: () => dispatch(resetArenasPage()),
    toggleAuthModal: event => {
      dispatch(toggleAuthModal());
      event.stopPropagation();
    },
    greenlightArena: (arenaId) => dispatch(greenlightArena(arenaId)),
    toggleInHomepage: () => dispatch(toggleInHomepage()),
  };
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;
