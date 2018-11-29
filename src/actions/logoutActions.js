import * as types from './actionTypes';
import axios from 'axios';
import * as loginApi from '../api/loginApi';
import { browserHistory } from 'react-router';
import * as constants from '../constants';
import { toggleLoadingIndicator } from './commonActions';
import { getPersistor } from '../index';

export function logout() {
  return (dispatch) => {
    dispatch(toggleLoadingIndicator());

    return loginApi.logout()
      .then(() => {
        browserHistory.push('/');
        axios.defaults.headers.common[constants.TOKEN_HEADER_NAME] = null;
        dispatch(logoutSuccess());
        getPersistor().purge();
      })
      .catch((error) => {
        dispatch(logoutFailure());
        console.log(error);
      });
  };
}

export function logoutFailure() {
  return {
    type: types.LOGOUT_FAILURE,
    message: {
      text: 'There was an error logging out, please try again',
    }
  };
}

export function logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS,
  };
}
