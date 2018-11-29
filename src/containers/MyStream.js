import { connect } from 'react-redux';
import MyStream from '../components/Stream/MyStream';
import * as streamActions from '../actions/streamActions';
import { greenlightMedia } from '../actions/greenlightActions';

const mapStateToProps = (state) => {
  const enabledMediaList = state.filtersortReducer.sorts['mediaList'].enabled;
  return {
    authenticated: state.loginReducer.authenticated,
    myStream: state.streamReducer.myStream,
    arenasList: state.streamReducer.arenas,
    filters: state.filtersortReducer.filters['mediaList'].enabled,
    sortType: enabledMediaList,
    sortOrder: state.filtersortReducer.sorts['mediaList'].sortOrder[enabledMediaList],
    filterArenaIds: state.filtersortReducer.filters['mediaList'].arenaIds,
    typeIds: state.filtersortReducer.filters['mediaList'].typeIds,
    currentPage: state.streamReducer.myStreamPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStream: (page, filters, sortType, sortOrder, arenaIds, typeIds,
      filtered) => {
      dispatch(streamActions.fetchStream(page, filters, sortType, sortOrder,
        arenaIds, typeIds, filtered));
    },
    greenlightMedia: (mediaId) => {
      dispatch(greenlightMedia(mediaId));
    },
  };
};

const MySteamContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyStream);

export default MySteamContainer;
