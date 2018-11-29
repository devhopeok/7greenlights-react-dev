import React, { PropTypes, Component } from 'react';
import ProfileCover from './ProfileCover';
import ProfileTabs from './ProfileTabs';
import { profileTabs } from 'constants';
import { getParameterByName, mediaLink } from 'utils/helpers';
import { browserHistory } from 'react-router';

class Profile extends Component {

  componentWillMount() {
    this.loadData(this.props);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fetchNextPage);
  }

  componentWillReceiveProps(nextProps) {
    const { params, unmountProfile, filters, sortType, sortOrder,
      fetchProfileMedia } = this.props;
    const mediaParam = getParameterByName('media');

    if (nextProps.params.profileId != params.profileId) {
      unmountProfile();
      this.loadData(nextProps);
    } else if (filters !== nextProps.filters ||
      sortType !== nextProps.sortType ||
      sortOrder !== nextProps.sortOrder) {

      fetchProfileMedia(params.profileId, nextProps.currentPage, nextProps.filters,
        nextProps.sortType, nextProps.sortOrder, mediaParam);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fetchNextPage);
  }

  isMine(id = null) {
    const { currentUser, params } = this.props;
    const profileId = id || params.profileId;
    return (currentUser !== null && (profileId == currentUser.id));
  }

  loadData(props) {
    const { getProfile, getMyProfile, getGreenlitPeople, getMyGreenlitPeople,
      fetchProfileMedia, switchTab } = this.props;
    const isMine = this.isMine(props.params.profileId);

    if (isMine) {
      const path = mediaLink(props.params.profileId, mediaParam, true);
      const mediaParam = getParameterByName('media');
      getMyProfile();
      getMyGreenlitPeople();
      switchTab(profileTabs.bio);
      mediaParam && browserHistory.push(path);
    } else {
      getProfile(props.params.profileId);
      getGreenlitPeople(props.params.profileId);
      fetchProfileMedia(props.params.profileId, props.currentPage,
        props.filters, props.sortType, props.sortOrder,
        getParameterByName('media'));
    }
  }

  fetchNextPage = () => {
    const { fetchProfileMedia, filters, sortType, sortOrder, params,
      currentPage } = this.props;

    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      fetchProfileMedia(params.profileId, currentPage, filters, sortType,
        sortOrder);
    }
  }

  render() {
    const { currentUser, switchTab, currentTab, updateUser,
      profileData, greenlightUser, updateUserPicture,
      greenlitPeople, profileMedia, greenlightMedia } = this.props;

    let isMine = this.isMine();
    let user = isMine ? currentUser : profileData;

    return (
      <div className="full-page outerspace-bg">
        <ProfileCover
          isMine={isMine}
          user={user}
          updateUser={updateUser}
          updateUserPicture={updateUserPicture}
          greenlightUser={greenlightUser}
        />
        <ProfileTabs
          user={user}
          selectedTab={currentTab}
          switchTab={switchTab}
          isMine={isMine}
          updateUser={updateUser}
          greenlightUser={greenlightUser}
          greenlitPeople={greenlitPeople}
          media={profileMedia}
          greenlightMedia={greenlightMedia}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  greenlightUser: PropTypes.func.isRequired,
  greenlitPeople: PropTypes.array,
  getGreenlitPeople: PropTypes.func.isRequired,
  getMyGreenlitPeople: PropTypes.func.isRequired,
  fetchProfileMedia: PropTypes.func.isRequired,
  unmountProfile: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  profileData: PropTypes.object.isRequired,
  switchTab: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateUserPicture: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  getMyProfile: PropTypes.func.isRequired,
  greenlightMedia: PropTypes.func.isRequired,
  profileMedia: PropTypes.array,
  params: PropTypes.object,
  filters: PropTypes.array,
  sortOrder: PropTypes.number,
  sortType: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
};

export default Profile;
