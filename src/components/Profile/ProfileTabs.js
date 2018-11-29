import React, { PropTypes } from 'react';
import TabHeader from './TabHeader';
import RenderTab from './Tabs/renderTab';
import Tooltip from 'components/Tooltip/Tooltip';
import { tooltipIds, profileTabs } from 'constants';

const ProfileTabs = ({ user, switchTab, selectedTab, isMine, updateUser,
  greenlightUser, greenlitPeople, greenlightMedia, media }) => {
  return (
    <div className="profile-content-container">
      <div className="profile-tab-headers has-tooltip">
        {
          !isMine &&
          <TabHeader
            switchTab={switchTab}
            name="MEDIA" id={profileTabs.media}
            selectedTab={selectedTab}
          />
        }
        <TabHeader
          switchTab={switchTab}
          name="BIO" id={profileTabs.bio}
          selectedTab={selectedTab}
          isMine={isMine}
        />
        <TabHeader
          switchTab={switchTab}
          name="BLASTS™" id={profileTabs.blasts}
          selectedTab={selectedTab}
        />
        <TabHeader
          switchTab={switchTab}
          name="GREENLIT® PEOPLE"
          id={profileTabs.greenlitPeople}
          selectedTab={selectedTab}
        />
        <TabHeader
          switchTab={switchTab}
          name="NOTES™ UPLOADED"
          id={profileTabs.notes}
          selectedTab={selectedTab}
        />
      <Tooltip tooltipId={tooltipIds.myProfile} />
      </div>
      <div className="divider-line" />
      <RenderTab
        selectedTab={selectedTab}
        user={user}
        isMine={isMine}
        updateUser={updateUser}
        greenlitPeople={greenlitPeople}
        greenlightUser={greenlightUser}
        greenlightMedia={greenlightMedia}
        media={media}
      />
    </div>
  );
};

ProfileTabs.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired,
  greenlightUser: PropTypes.func.isRequired,
  greenlitPeople: PropTypes.array,
  greenlightMedia: PropTypes.func.isRequired,
  media: PropTypes.array,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  isMine: PropTypes.bool.isRequired,
};

export default ProfileTabs;
