import React, { PropTypes, Component } from 'react';
import Notification from './Notification';
import onClickOutside from 'react-onclickoutside';

class NotificationsScroll extends Component {

  componentDidMount() {
    let scrollingDiv = document.getElementById('notifications-scrollable');
    scrollingDiv.addEventListener('scroll', this.fetchNextPage);
  }

  componentWillUnmount() {
    let scrollingDiv = document.getElementById('notifications-scrollable');
    scrollingDiv.removeEventListener('scroll', this.fetchNextPage);
  }

  fetchNextPage = (e) => {
    const { getNotifications, currentPage } = this.props;
    let scrollingDiv = e.currentTarget;

    if (scrollingDiv.scrollTop + scrollingDiv.offsetHeight == scrollingDiv.scrollHeight) {
      getNotifications(currentPage);
    }
  };

  handleClickOutside() {
    const { toggleNotificationModal } = this.props;
    toggleNotificationModal();
  }

  render() {
    const { notifications } = this.props;

    return (
      <div id="notifications-scrollable" className="notifications-scrollable">
        {
          !notifications.length &&
          <h1>You don&#8217;t have notifications</h1>
        }
        {
          notifications.map((notification, index) =>
            (<Notification key={index} notification={notification} />)
          )
        }
      </div>
    );
  }
}

NotificationsScroll.propTypes = {
  notifications: PropTypes.array,
  getNotifications: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  enableOnClickOutside: PropTypes.func.isRequired,
  toggleNotificationModal: PropTypes.func.isRequired,
};

export default onClickOutside(NotificationsScroll);
