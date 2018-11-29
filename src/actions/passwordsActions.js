import * as types from './actionTypes';
import * as passwordsApi from '../api/passwordsApi';

export function forgotPasswordRequest() {
  return {
    type: types.FORGOT_PASSWORD_REQUEST
  };
}

export function forgotPasswordSuccess() {
  return {
    type: types.FORGOT_PASSWORD_SUCCESS,
    message: 'Email Successfully Sent.'
  };
}

export function forgotPasswordFailure() {
  return {
    type: types.FORGOT_PASSWORD_FAILURE,
    message: 'Oops! An error has occurred.'
  };
}

export function updatePasswordRequest() {
  return {
    type: types.UPDATE_PASSWORD_REQUEST
  };
}

export function updatePasswordSuccess() {
  return {
    type: types.UPDATE_PASSWORD_SUCCESS,
    message: 'Your Password has been changed.'
  };
}

export function updatePasswordFailure() {
  return {
    type: types.UPDATE_PASSWORD_FAILURE,
    message: 'Error updating your password.'
  };
}

export function initializeEditPassword() {
  return {
    type: types.INITIALIZE_EDIT_PASSWORD
  };
}

export function forgotPassword(email) {
  return (dispatch) => {
    dispatch(forgotPasswordRequest());

    return passwordsApi.forgotPassword(email)
      .then(() => {
        dispatch(forgotPasswordSuccess());
      })
      .catch((error) => {
        dispatch(forgotPasswordFailure());
        console.log(error);
      });
  };
}

export function updatePassword(updatePasswordData) {
  return (dispatch) => {
    dispatch(updatePasswordRequest());

    return passwordsApi.updatePassword(updatePasswordData)
      .then(() => {
        dispatch(updatePasswordSuccess());
      })
      .catch((error) => {
        dispatch(updatePasswordFailure());
        console.log(error);
      });
  };
}
