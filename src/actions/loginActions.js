import * as types from './actionTypes';
import { browserHistory } from 'react-router';
import * as loginApi from '../api/loginApi';
import { setUpPusher } from './pusherActions';
import { toggleLoadingIndicator } from './commonActions';

export function loginFailure() {
  return {
    type: types.LOGIN_FAILURE,
    error: 'Login failed, please try again'
  };
}

export function clearError() {
  return {
    type: types.LOGIN_FAILURE,
    error: 'Login failed, please try again'
  };
}

export function loginSuccess(user) {
  browserHistory.push('/');
  return {
    type: types.LOGIN_SUCCESS,
    user: user,
  };
}

export function clearLoginModalMessages() {
  return {
    type: types.CLEAR_LOGIN_MODAL_MESSAGES
  };
}

export function login(loginData) {
  return (dispatch) => {
    dispatch(toggleLoadingIndicator());
    return loginApi.login(loginData)
      .then((response) => {
        dispatch(loginSuccess(response));
        dispatch(setUpPusher(response.channel));
      })
      .catch((error) => {
        dispatch(loginFailure());
        console.log(error);
      });
  };
}
