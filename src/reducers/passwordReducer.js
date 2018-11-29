import * as types from '../actions/actionTypes';

const initialState = {
  forgotPasswordError: '',
  forgotPasswordSuccess: '',
  updatePasswordError: '',
  updatePasswordSuccess: '',
  passwordUpdated: false
};

export default function passwordReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_PASSWORD_FAILURE: {
      return {
        ...state,
        updatePasswordError: action.message
      };
    }
    case types.UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        updatePasswordSuccess: action.message,
        passwordUpdated: true
      };
    }
    case types.FORGOT_PASSWORD_FAILURE: {
      return {
        ...state,
        forgotPasswordError: action.message
      };
    }
    case types.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordSuccess: action.message
      };
    }
    case types.CLEAR_LOGIN_MODAL_MESSAGES: {
      return {
        ...state,
        isForgotPassword: !state.isForgotPassword,
        forgotPasswordError: null,
        forgotPasswordSuccess: null
      };
    }
    case types.INITIALIZE_EDIT_PASSWORD: {
      return {
        ...state,
        passwordUpdated: false
      };
    }
    default:
      return state;
  }
}
