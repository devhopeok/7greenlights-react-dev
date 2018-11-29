import React, { PropTypes } from 'react';
import NotificationMessage from './NotificationMessage';
import moment from 'moment';
import profilePlaceholder from '../App/img/profile-ph.png';
import mediaPlaceholder from 'components/Arena/img/media-ph.svg';
import { notificationLink } from 'utils/helpers';

const Notification = ({ notification }) => {
  let agoString = moment(notification.created_at).fromNow();
  const url = notificationLink(notification);

  return (
    <a className="notification-container" href={url}>
      <div className="notification">
        <img
          src={notification.sender_thumbnail || profilePlaceholder}
          className="user-picture"
        />
        <div className="noti-info">
          <NotificationMessage notification={notification} />
          <i className="time-ago">{agoString}</i>
        </div>
        <img
          className="object-picture"
          src={notification.event_entity_thumbnail || mediaPlaceholder}
        />
      </div>
      <div className="divider-line" />
    </a>
  );
};

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default Notification;
