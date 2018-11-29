import * as types from '../actions/actionTypes';

const initialState = {
  newUserData: {},
  socialError: '',
  socialNetwork: '',
  snAccessToken: '',
};

const parseBirthday = (birthdayString) => {
  let dob = {};
  if (birthdayString) {
    let birthdayArray = birthdayString.split('/');
    if (birthdayArray.length == 1) {
      dob.year = birthdayArray[0];
    } else if (birthdayArray.length == 2) {
      dob.month = birthdayArray[0];
      dob.day = birthdayArray[1];
    } else {
      dob.month = birthdayArray[0];
      dob.day = birthdayArray[1];
      dob.year = birthdayArray[2];
    }
  }
  return dob;
};

export default function signupReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SIGNUP_EXIT:
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        socialNetwork: '',
      };
    case types.SIGNUP_FAILURE:
      return {
        ...state,
        signupData: initialState.signupData,
        socialNetwork: '',
      };
    case types.SOCIAL_LOGIN_SUCCESS: {
      let userData = action.userData;

      let birthday = parseBirthday(action.userData.birthday);
      userData.dob_day = birthday.day;
      userData.dob_month = birthday.month;
      userData.dob_year = birthday.year;

      return {
        ...state,
        newUserData: userData,
        socialNetwork: action.socialNetwork,
        snAccessToken: action.accessToken,
      };
    }
    case types.SOCIAL_LOGIN_ERROR: {
      return {
        ...state,
        socialError: action.error,
        socialNetwork: '',
      };
    }
    default:
      return state;
  }
}
