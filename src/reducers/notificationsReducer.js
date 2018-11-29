import * as types from '../actions/actionTypes';

const initialState = {
  notifications: [],
  displayNotificationsModal: false,
  newNotification: false,
  currentPage: 1,
};

export default function logoutReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGOUT_SUCCESS: {
      return {
        ...state,
        notifications: initialState.notifications,
      };
    }
    case types.TOGGLE_NOTIFICATIONS_MODAL: {
      return {
        ...state,
        displayNotificationsModal: !state.displayNotificationsModal,
        newNotification: false,
      };
    }
    case types.NEW_NOTIFICATION: {
      let notification = action.notification;
      let newNotificationsArray = state.notifications.slice();
      newNotificationsArray.unshift(notification);
      return {
        ...state,
        notifications: newNotificationsArray,
        newNotification: true,
      };
    }
    case types.GET_NOTIFICATIONS_SUCCESS: {
      let notificationsArray = [];
      action.notifications.forEach(notificationData =>
        notificationsArray.push(notificationData.data)
      );

      let nextPage =
        state.currentPage + ((action.notifications.length === 0) ? 0 : 1);

      if (state.currentPage != 1) {
        notificationsArray = state.notifications.concat(notificationsArray);
      }

      return {
        ...state,
        notifications: notificationsArray,
        currentPage: nextPage,
      };
    }
    default:
      return state;
  }
}
