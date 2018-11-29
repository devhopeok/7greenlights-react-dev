import * as types from './actionTypes';
import * as userApi from '../api/userApi';
import { SubmissionError } from 'redux-form';
import { toggleLoadingIndicator } from './commonActions';

export function switchProfileTab(id) {
  return {
    type: types.SWITCH_PROFILE_TAB,
    id,
  };
}

export function updateUserSuccess(userData) {
  return {
    type: types.UPDATE_USER_SUCCESS,
    userData,
  };
}

export function updateUserFailure(message) {
  return {
    type: types.UPDATE_USER_FAILURE,
    message,
  };
}

export function getProfileSuccess(profileData) {
  return {
    type: types.GET_PROFILE_SUCCESS,
    profileData,
  };
}

export function getProfileFailure(message) {
  return {
    type: types.GET_PROFILE_FAILURE,
    message,
  };
}

export function getMyProfileSuccess(userData) {
  return {
    type: types.GET_MY_PROFILE_SUCCESS,
    userData,
  };
}

export function getMyProfileFailure(message) {
  return {
    type: types.GET_MY_PROFILE_FAILURE,
    message,
  };
}

export function getGreenlitPeopleSuccess(greenlitPeople) {
  return {
    type: types.GET_GREENLIT_PEOPLE_SUCCESS,
    greenlitPeople,
  };
}

export function unmountProfile() {
  return {
    type: types.UNMOUNT_PROFILE,
  };
}

export function getGreenlitPeopleFailure(message) {
  return {
    type: types.GET_GREENLIT_PEOPLE_FAILURE,
    message,
  };
}

export function fetchProfileMediaSuccess(profileMedia, filtered, specificMedia) {
  return {
    type: types.FETCH_PROFILE_MEDIA_SUCCESS,
    profileMedia,
    filtered,
    specificMedia,
  };
}

export function fetchProfileMediaFailure(message) {
  return {
    type: types.FETCH_PROFILE_MEDIA_FAILURE,
    message,
  };
}

export function updateUser(userData) {
  return (dispatch) => {
    dispatch(toggleLoadingIndicator());
    return userApi.updateUser(userData)
      .then(user => dispatch(updateUserSuccess(user)))
      .catch((error) => {
        dispatch(updateUserFailure());
        error._error = `Username ${error.username}`;
        return Promise.reject(new SubmissionError(error));
      });
  };
}

export function updateUserPicture(userData) {
  return (dispatch) => {
    dispatch(toggleLoadingIndicator());
    return userApi.updateUserPicture(userData)
      .then(user => dispatch(updateUserSuccess(user)))
      .catch((error) => {
        dispatch(updateUserFailure({
          title: 'Oops',
          text: 'There was an issue updating your profile picture, please try again',
        }));
        console.error(error);
      });
  };
}

export function getProfile(userId) {
  return (dispatch) => {
    return userApi.getProfile(userId)
      .then((response) => {
        dispatch(getProfileSuccess(response));
      })
      .catch((error) => {
        dispatch(getProfileFailure(error));
        console.error(error);
      });
  };
}

export function getMyProfile() {
  return (dispatch) => {
    return userApi.getMyProfile()
      .then((response) => {
        dispatch(getMyProfileSuccess(response));
      })
      .catch((error) => {
        dispatch(getMyProfileFailure(error));
        console.error(error);
      });
  };
}

export function getGreenlitPeople(userId) {
  return (dispatch) => {
    return userApi.getGreenlitPeople(userId)
      .then((response) => {
        dispatch(getGreenlitPeopleSuccess(response.users));
      })
      .catch((error) => {
        dispatch(getGreenlitPeopleFailure(error));
        console.error(error);
      });
  };
}

export function getMyGreenlitPeople(userId) {
  return (dispatch) => {
    return userApi.getMyGreenlitPeople(userId)
      .then((response) => {
        dispatch(getGreenlitPeopleSuccess(response.users));
      })
      .catch((error) => {
        dispatch(getGreenlitPeopleFailure(error));
        console.error(error);
      });
  };
}

export function fetchProfileMedia(userId, page, filters, sortType, sortOrder,
  specificMediaId, filtered) {
  return (dispatch) => {
    return userApi.fetchProfileMedia(userId, page, filters, sortType, sortOrder,
      specificMediaId)
      .then((response) => {
        dispatch(fetchProfileMediaSuccess(response.media_contents,
          filtered, response.media_requested));
      })
      .catch((error) => {
        dispatch(fetchProfileMediaFailure(error));
        console.error(error);
      });
  };
}
