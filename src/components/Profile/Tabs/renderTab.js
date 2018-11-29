import React, { PropTypes } from 'react';
import MediaTab from './MediaTab';
import BioTab from './BioTab';
import BlastsTab from './BlastsTab';
import GreenlitPeopleTab from './GreenlitPeopleTab';
import NotesTab from './NotesTab';
import { profileTabs } from 'constants';

const RenderTab = ({ user, selectedTab, isMine, updateUser, greenlightUser,
  greenlitPeople, greenlightMedia, media }) => {

  switch (selectedTab) {
    case profileTabs.media:
      return <MediaTab greenlightMedia={greenlightMedia} media={media} user={user} />;
    case profileTabs.bio:
     return <BioTab isMine={isMine} user={user} updateUser={updateUser} />;
    case profileTabs.blasts:
     return <BlastsTab />;
    case profileTabs.greenlitPeople:
     return (
        <GreenlitPeopleTab
          greenlitPeople={greenlitPeople}
          greenlightUser={greenlightUser}
        />
      );
    case profileTabs.notes:
     return <NotesTab />;
    default:
     return <MediaTab greenlightMedia={greenlightMedia} media={media} user={user} />;
  }
};

RenderTab.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  greenlitPeople: PropTypes.array,
  greenlightUser: PropTypes.func.isRequired,
  media: PropTypes.array,
  greenlightMedia: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  isMine: PropTypes.bool.isRequired,
};

export default RenderTab;
