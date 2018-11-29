import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import LoginModal from './LoginModal';
import UserBox from './UserBox';
import mainLogo from './img/main-logo.svg';

const TopBar = ({ inHomepage, user, logout, toggleTopBarModal,
  shouldDisplayTopBarModal, authenticated, toggleNotificationModal,
  hasNewNotification }) => {

  return (
    <div className="top-bar">
      <div className="left-box">
        { ((!inHomepage && !authenticated) || authenticated) &&
          <Link to={'/'}>
            <img src={mainLogo} className="main-logo" />
          </Link>
        }
      </div>
      <div className="right-box">
        {
          (!authenticated) ?
            <button
              onClick={toggleTopBarModal}
              className="standard-label sign-in-btn"
            >
              Sign In
            </button>
          : <UserBox
              logout={logout}
              user={user}
              inHomepage={inHomepage}
              toggleTopBarModal={toggleTopBarModal}
              shouldBeDisplayed={shouldDisplayTopBarModal}
              toggleNotificationModal={toggleNotificationModal}
              hasNewNotification={hasNewNotification}
            />
        }
        { !authenticated && shouldDisplayTopBarModal &&
          <LoginModal
            onRequestClose={toggleTopBarModal}
            eventTypes="click"
          />
        }
      </div>
    </div>
  );
};

TopBar.propTypes = {
  inHomepage: PropTypes.bool,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  toggleTopBarModal: PropTypes.func.isRequired,
  shouldDisplayTopBarModal: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool,
  toggleNotificationModal: PropTypes.func.isRequired,
  hasNewNotification: PropTypes.bool,
};

export default TopBar;
