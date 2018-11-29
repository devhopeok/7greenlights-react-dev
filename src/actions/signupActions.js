import * as types from './actionTypes';
import * as userApi from '../api/userApi';
import * as loginApi from '../api/loginApi';
import { browserHistory } from 'react-router';
import { toggleLoadingIndicator } from './commonActions';
import { SubmissionError } from 'redux-form';

export function signupSuccess(user) {
  return {
    type: types.SIGNUP_SUCCESS,
    user,
  };
}

export function signupFailure(message) {
  return {
    type: types.SIGNUP_FAILURE,
    message,
  };
}

export function exitSignup() {
  return {
    type: types.SIGNUP_EXIT,
  };
}

export function socialLoginSuccess(userData, socialNetwork, accessToken) {
  return {
    type: types.SOCIAL_LOGIN_SUCCESS,
    userData,
    socialNetwork,
    accessToken,
  };
}

export function socialLoginError(error) {
  return {
    type: types.SOCIAL_LOGIN_FAILURE,
    message: { text: error },
  };
}

export function signup(signupData) {
  return (dispatch) => {
    dispatch(toggleLoadingIndicator());
    return userApi.signup(signupData)
      .then((response) => {
        dispatch(signupSuccess(response));
        browserHistory.push('/');
        return Promise.resolve();
      })
      .catch((error) => {
        dispatch(signupFailure());
        return Promise.reject(new SubmissionError(error));
      });
  };
}

export function fbLoginSuccess(response) {
  return (dispatch) => {
    let accessToken = response.accessToken;
    return loginApi.loginWithFacebook(accessToken)
      .then((response) => {
        if (response.token) {
          dispatch(signupSuccess(response));
          browserHistory.push('/');
        } else {
          dispatch(socialLoginSuccess(response, 'facebook', accessToken));
          browserHistory.push('/signup');
        }
      })
      .catch((error) => socialLoginError(error));
  };
}

export function igLoginSuccess(accessToken) {
  return (dispatch) => {
    return loginApi.loginWithInstagram(accessToken)
      .then((response) => {
        if (response.token) {
          dispatch(signupSuccess(response));
          browserHistory.push('/');
        } else {
          dispatch(socialLoginSuccess(response, 'instagram', accessToken));
          browserHistory.push('/signup');
        }
      })
      .catch((error) => socialLoginError(error));
  };
}
