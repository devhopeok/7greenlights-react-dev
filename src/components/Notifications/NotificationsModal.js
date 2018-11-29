import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleNotificationModal, getNotifications }
from '../../actions/notificationsActions';
import NotificationsScroll from './NotificationsScroll';

let NotificationsModal = ({ notifications, toggleNotificationModal,
  displayNotificationsModal, getNotifications, currentPage }) => (
  <div
    hidden={!displayNotificationsModal}
    className="notifications-modal"
  >
    <NotificationsScroll
      toggleNotificationModal={toggleNotificationModal}
      notifications={notifications}
      getNotifications={getNotifications}
      currentPage={currentPage}
      eventTypes="click"
      disableOnClickOutside={!displayNotificationsModal}
    />
  </div>
);

NotificationsModal.propTypes = {
  isOpen: PropTypes.bool,
  notifications: PropTypes.array,
  displayNotificationsModal: PropTypes.bool,
  toggleNotificationModal: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

NotificationsModal = connect(
  state => ({
    notifications: state.notificationsReducer.notifications,
    displayNotificationsModal:
      state.notificationsReducer.displayNotificationsModal,
    currentPage: state.notificationsReducer.currentPage,
  }),
  dispatch => ({
    toggleNotificationModal: () => dispatch(toggleNotificationModal()),
    getNotifications: (page) => dispatch(getNotifications(page)),
  }),
)(NotificationsModal);

export default NotificationsModal;
