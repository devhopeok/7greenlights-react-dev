import * as types from './actionTypes';
import { getMyNotifications } from '../api/userApi';

export function toggleNotificationModal() {
  return {
    type: types.TOGGLE_NOTIFICATIONS_MODAL,
  };
}

export function getNotificationsSuccess(notifications) {
  return {
    type: types.GET_NOTIFICATIONS_SUCCESS,
    notifications,
  };
}

export function getNotifications(page) {
  return (dispatch) => {
    return getMyNotifications(page)
      .then((response) => {
        dispatch(getNotificationsSuccess(response.notifications));
      })
      .catch(console.error);
  };
}
