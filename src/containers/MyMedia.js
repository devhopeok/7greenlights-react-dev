import { connect } from 'react-redux';
import MyMedia from '../components/Media/MyMedia';
import * as mediaActions from '../actions/mediaActions';
import { greenlightMedia } from '../actions/greenlightActions';

const mapStateToProps = (state) => {
  const enabledMediaList = state.filtersortReducer.sorts['mediaList'].enabled;
  return {
    authenticated: state.loginReducer.authenticated,
    user: state.loginReducer.user,
    currentWhereLink: state.mediaReducer.currentWhereLink,
    mediaUrl: state.mediaReducer.mediaUrl,
    myMedia: state.mediaReducer.myMedia,
    currentPage: state.mediaReducer.myMediaPage,
    editingMedia: state.mediaReducer.editingMedia,
    shouldDisplayUpload: state.mediaReducer.shouldDisplayUpload,
    editingId: state.mediaReducer.editingId,
    typeIds: state.filtersortReducer.filters['mediaList'].typeIds,
    filters: state.filtersortReducer.filters['mediaList'].enabled,
    sort: enabledMediaList,
    sortOrder: state.filtersortReducer.sorts['mediaList'].sortOrder[enabledMediaList],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadMedia: (media) => {
      dispatch(mediaActions.uploadMedia(media));
    },
    setMediaLink: (url) => {
      dispatch(mediaActions.fetchMediaInfo(url));
    },
    updateCurrentLink: (link) => {
      dispatch(mediaActions.updateCurrentLink(link));
    },
    fetchMedia: (page, filters, sortType, sortOrder, specificMediaId, typeIds,
      filtered) => {
      dispatch(mediaActions.fetchMedia(page, filters, sortType, sortOrder,
        typeIds, specificMediaId, filtered));
    },
    deleteMedia: (id) => {
      dispatch(mediaActions.deleteMedia(id));
    },
    updateMedia: (media) => {
      dispatch(mediaActions.updateMedia(media));
    },
    setEditMode: (media) => {
      dispatch(mediaActions.setEditMode(media));
    },
    toggleUploadMedia: () => {
      dispatch(mediaActions.toggleUploadMedia());
    },
    toggleEditMedia: () => {
      dispatch(mediaActions.toggleEditMedia());
    },
    greenlightMedia: (mediaId) => {
      dispatch(greenlightMedia(mediaId));
    },
  };
};

const MyMediaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMedia);

export default MyMediaContainer;
