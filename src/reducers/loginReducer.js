import * as types from '../actions/actionTypes';

const initialState = {
  user: null,
  authenticated: false,
  loginData: {
    email: '',
    password: '',
  },
  loginError: null,
};

export default function loginReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        authenticated: true,
      };
    }
    case types.LOGIN_FAILURE: {
      return {
        ...state,
        loginError: action.error,
        loginData: initialState.loginData,
      };
    }
    case types.LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        authenticated: false,
      };
    }
    case types.GET_MY_PROFILE_SUCCESS:
    case types.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: { ...state.user, ...action.userData },
      };
    }
    case types.SEND_BLAST_SUCCESS: {
      let user = { ...state.user, last_blast: action.text.text };
      return {
        ...state,
        user,
      };
    }
    case types.CLEAR_LOGIN_MODAL_MESSAGES: {
      return {
        ...state,
        loginError: null
      };
    }
    default:
      return state;
  }
}
