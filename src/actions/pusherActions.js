import * as types from './actionTypes';
import Pusher from 'pusher-js';
import Config from 'Config';

export function newNotification(notification) {
  return {
    type: types.NEW_NOTIFICATION,
    notification,
  };
}

export function setUpPusher(channelId) {
  return (dispatch) => {
    let pusher = new Pusher(Config.pusherKey);
    let channel = pusher.subscribe(channelId);

    let dispatchNotification =
      (notification) => dispatch(newNotification(notification));

    return channel.bind('notifications', dispatchNotification);
  };
}
