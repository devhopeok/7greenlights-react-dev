import React, { PropTypes } from 'react';

const ProfileStats = ({ user }) => (
  <div className="profile-stats-container">
    <div className="profile-stats">
      <div className="profile-stat">
        <label className="stat-title">GREENLIGHTS® RECEIVED</label>
        <label className="stat">{user.greenlights_received}</label>
      </div>
      <div className="profile-stat">
        <label className="stat-title">GREENLIGHTS® TO MEDIA</label>
        <label className="stat">{user.greenlights_to_media}</label>
      </div>
      <div className="profile-stat">
        <label className="stat-title">GREENLIGHTS® GIVEN</label>
        <label className="stat">0</label>
      </div>
      <div className="profile-stat">
        <label className="stat-title">BLASTS™</label>
        <label className="stat">0</label>
      </div>
      <div className="profile-stat">
        <label className="stat-title">NOTES™ UPLOADED</label>
        <label className="stat">0</label>
      </div>
      <div className="profile-stat">
        <label className="stat-title">NOTES™ TO MEDIA</label>
        <label className="stat">0</label>
      </div>
    </div>
  </div>
);

ProfileStats.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileStats;
