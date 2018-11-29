import { connect } from 'react-redux';
import Profile from '../components/Profile/Profile';
import * as profileActions from '../actions/profileActions';
import { greenlightUser, greenlightMedia } from '../actions/greenlightActions';

const mapStateToProps = (state) => {
  const enabledMediaList = state.filtersortReducer.sorts['mediaList'].enabled;
  return {
    currentUser: state.loginReducer.user,
    profileData: state.profileReducer.profileData,
    greenlitPeople: state.profileReducer.greenlitPeople,
    currentTab: state.profileReducer.currentTab,
    profileMedia: state.profileReducer.profileMedia,
    filters: state.filtersortReducer.filters['mediaList'].enabled,
    sortType: enabledMediaList,
    sortOrder: state.filtersortReducer.sorts['mediaList'].sortOrder[enabledMediaList],
    currentPage: state.profileReducer.currentProfileMediaPage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchTab: id => dispatch(profileActions.switchProfileTab(id)),
    updateUser: userData => dispatch(profileActions.updateUser(userData)),
    updateUserPicture: userData =>
      dispatch(profileActions.updateUserPicture(userData)),
    getProfile: userId => dispatch(profileActions.getProfile(userId)),
    getMyProfile: () => dispatch(profileActions.getMyProfile()),
    greenlightUser: userId => dispatch(greenlightUser(userId)),
    getGreenlitPeople: userId =>
      dispatch(profileActions.getGreenlitPeople(userId)),
    getMyGreenlitPeople: () => dispatch(profileActions.getMyGreenlitPeople()),
    unmountProfile: () => dispatch(profileActions.unmountProfile()),
    fetchProfileMedia: (userId, page, filters, sortType, sortOrder, specificMediaId,
      filtered) =>
      dispatch(profileActions.fetchProfileMedia(userId, page, filters, sortType,
        sortOrder, specificMediaId, filtered)),
    greenlightMedia: mediaId => dispatch(greenlightMedia(mediaId)),
  };
};

const ArenaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default ArenaContainer;
