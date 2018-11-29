import React, { PropTypes } from 'react';
import BlastBox from '../Blast/BlastBox';
import triangleIcon from './img/triangle.png';
import UserDropDown from './UserDropDown';
import { Link } from 'react-router';
import Tooltip from 'components/Tooltip/Tooltip';
import { tooltipIds } from 'constants';
import NotificationsButton from './NotificationsButton';

const UserBox = ({ user, logout, toggleTopBarModal, shouldBeDisplayed,
  toggleNotificationModal, hasNewNotification, inHomepage }) => {

  return (
    <div className="user-box">
      <div className="user-links">
        <BlastBox inHomepage={inHomepage} />
        <div className="divider-line"/>
        <Link className="has-tooltip" to="/">Venues™
          {
            inHomepage &&
            <Tooltip tooltipId={tooltipIds.homeArena} />
          }
        </Link>
        <Link to="/mymedia">My Media</Link>
        <Link to="/mystream">My Stream</Link>
        <Link to="/about">Help</Link>
        <NotificationsButton
          toggleNotificationModal={toggleNotificationModal}
          hasNewNotification={hasNewNotification}
        />
        <Link className="username-link" to={`/profile/${user.id}`}>
          {user.username}
        </Link>
        <img
          className="triangle-icon"
          src={triangleIcon}
          onClick={toggleTopBarModal}
        />
        <UserDropDown
          user={user}
          onRequestClose={toggleTopBarModal}
          isOpen={shouldBeDisplayed}
          logout={logout}
        />
      </div>
      <NotificationsButton
        toggleNotificationModal={toggleNotificationModal}
        hasNewNotification={hasNewNotification}
        forMobile
      />
    </div>
  );
};

UserBox.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  toggleTopBarModal: PropTypes.func.isRequired,
  shouldBeDisplayed: PropTypes.bool,
  toggleNotificationModal: PropTypes.func.isRequired,
  hasNewNotification: PropTypes.bool.isRequired,
  inHomepage: PropTypes.bool,
};

export default UserBox;
