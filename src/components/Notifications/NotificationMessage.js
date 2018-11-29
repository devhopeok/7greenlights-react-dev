import React, { PropTypes } from 'react';
import { notificationTypes } from 'constants';

const NotificationMessage = ({ notification }) => {
  let type = notification.notification_type;
  let username = <b>{notification.sender_username}</b>;

  switch (type) {
    case notificationTypes.MEDIA_CONTENT_GL: {
      return <label>{username} GreenLit® <b>{notification.event_entity_name}</b></label>;
    }
    case notificationTypes.NOTE_FEATURED: {
      return <label>{username} featured <b>your Note™</b></label>;
    }
    case notificationTypes.NOTE_GREENLIT: {
      return <label>{username} GreenLit® the Note™ you uploaded to <b>{notification.event_entity_name}</b></label>;
    }
    case notificationTypes.NOTE_UPLOADED: {
      return <label>{username} uploaded <b>a Note™ to {notification.event_entity_name}</b></label>;
    }
    case notificationTypes.USER_GREENLIT: {
      return <label>{username} GreenLit® <b>you</b></label>;
    }
    case notificationTypes.MEDIA_CONTENT_REPORTED: {
      return <label>{username} has reported your media content <b>{notification.event_entity_name}</b></label>;
    }
  }
};

NotificationMessage.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default NotificationMessage;
