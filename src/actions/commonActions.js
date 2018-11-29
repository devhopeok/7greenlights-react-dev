import * as types from './actionTypes';
import { updateUserTooltips } from '../api/tooltipApi';

export function toggleInHomepage() {
  return {
    type: types.TOGGLE_IN_HOMEPAGE,
  };
}

export function toggleTopBarModal() {
  return {
    type: types.TOGGLE_TOPBAR_MODAL,
  };
}

export function toggleAuthModal() {
  return {
    type: types.TOGGLE_AUTH_MODAL,
  };
}

export function toggleAuthModalType() {
  return {
    type: types.TOGGLE_AUTH_MODAL_TYPE,
  };
}

export function updateCountdown(id) {
  return {
    type: types.UPDATE_COUNTDOWN_TIMER,
    id,
  };
}

export function toggleMessageModal(message = {}) {
  return {
    type: types.TOGGLE_MESSAGE_MODAL,
    message,
  };
}

export function toggleTooltipSuccess(id) {
  return {
    type: types.TOGGLE_TOOLTIP_SUCCESS,
    id,
  };
}

export function toggleTooltipOnPage(id, showTooltips) {
  return (dispatch) => {
    dispatch(toggleTooltipSuccess(id));
    return updateUserTooltips(id, showTooltips).catch(console.log);
  };
}

export function toggleLoadingIndicator() {
  const message = { text: 'Loading...', loading: true };
  return dispatch => dispatch(toggleMessageModal(message));
}

export function toggleShareModal(media = null) {
  return {
    type: types.TOGGLE_SHARE_MODAL,
    media,
  };
}
