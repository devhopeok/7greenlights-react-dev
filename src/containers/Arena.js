import { connect } from 'react-redux';
import Arena from '../components/Arena/Arena';
import { fetchArena, togglePostToArena, postMediaToArena, addMediaToPost,
  removeMediaToPost } from '../actions/arenaActions';
import { greenlightArena, greenlightMedia } from '../actions/greenlightActions';
import { fetchMedia, fetchArenasMedia } from '../actions/mediaActions';
import { toggleAuthModal, toggleShareModal } from '../actions/commonActions';

const mapStateToProps = (state) => {
  const enabledMediaList = state.filtersortReducer.sorts['mediaList'].enabled;
  return {
    arena: state.arenasReducer.currentArena,
    myMedia: state.mediaReducer.myMedia,
    displayPostToArena: state.arenasReducer.displayPostToArena,
    mediasToPost: state.arenasReducer.mediasToPost,
    filterSortData: {
      filters: state.filtersortReducer.filters['mediaList'].enabled,
      sortType: enabledMediaList,
      sortOrder: state.filtersortReducer.sorts['mediaList'].sortOrder[enabledMediaList],
      popIds: state.filtersortReducer.filters['mediaList'].popIds,
      typeIds: state.filtersortReducer.filters['mediaList'].typeIds,
    },
    authenticated: state.loginReducer.authenticated,
    currentPage: state.arenasReducer.currentArenaMediaPage,
    currentMyMediaPage: state.arenasReducer.currentMyMediaPage,
    displayShareModal: state.shareReducer.displayShareModal,
    sharingObject: state.shareReducer.sharingObject,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArena: (arenaId, filterSortData) => {
      dispatch(fetchArena(arenaId, filterSortData));
    },
    greenlightArena: (event, arenaId) => {
      dispatch(greenlightArena(arenaId));
      event.stopPropagation();
    },
    fetchMedia: (page) => dispatch(fetchMedia(page)),
    togglePostToArena: () => dispatch(togglePostToArena()),
    fetchArenasMedia: (arenaId, page, filterSortData, filtered) =>
      dispatch(fetchArenasMedia(arenaId, page, filterSortData, filtered)),
    greenlightMedia: (mediaId) => dispatch(greenlightMedia(mediaId)),
    addMediaToPost: (id) => dispatch(addMediaToPost(id)),
    removeMediaToPost: (id) => dispatch(removeMediaToPost(id)),
    postMediaToArena: (medias, arenaId) => {
      let data = { arena_id: arenaId, medias };
      dispatch(postMediaToArena(data));
    },
    toggleAuthModal: () => dispatch(toggleAuthModal()),
    toggleShareModal: (media) => dispatch(toggleShareModal(media)),
  };
};

const ArenaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Arena);

export default ArenaContainer;
