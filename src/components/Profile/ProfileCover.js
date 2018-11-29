import React, { PropTypes } from 'react';
import ProfileStats from './ProfileStats';
import ProfileBasics from './ProfileBasics';

const ProfileCover = ({ user, isMine, updateUser, greenlightUser,
  updateUserPicture }) => {
  return (
    <div className="profile-cover-container">
      <div className={`dark-bg ${user.greenlit && 'blend-normal'}`}>
        { user.greenlit && <div className="greenlit-gradient" /> }
      </div>

      <div className="profile-cover">
        <ProfileBasics
          updateUser={updateUser}
          user={user}
          isMine={isMine}
          greenlightUser={greenlightUser}
          updateUserPicture={updateUserPicture}
        />
        <div className="divider-line" />
        <ProfileStats user={user} />
      </div>
    </div>
  );
};

ProfileCover.propTypes = {
  user: PropTypes.object.isRequired,
  isMine: PropTypes.bool.isRequired,
  greenlightUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateUserPicture: PropTypes.func.isRequired,
};

export default ProfileCover;
