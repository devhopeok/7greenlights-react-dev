import React, { PropTypes } from 'react';
import NotificationsModal from '../Notifications/NotificationsModal';
import notificationIcon from './img/notifications.png';

const NotificationsButton =
  ({ toggleNotificationModal, hasNewNotification, forMobile = false }) => (
  <button
    className={
      `notification-icon
      ${hasNewNotification ? 'has-new' : ''}
      ${forMobile ? 'notification-burger' : ''}`
    }
    onClick={toggleNotificationModal}
  >
    <img src={notificationIcon} />
    <NotificationsModal />
  </button>
);

NotificationsButton.propTypes = {
  toggleNotificationModal: PropTypes.func.isRequired,
  hasNewNotification: PropTypes.bool,
  forMobile: PropTypes.bool,
};

export default NotificationsButton;
