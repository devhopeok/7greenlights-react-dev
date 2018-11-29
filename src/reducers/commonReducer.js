import * as types from '../actions/actionTypes';
import { tooltipArray } from '../constants';

let showTooltips = {};
tooltipArray.map(tooltip => {
  showTooltips[tooltip.id] = false;
});

const initialState = {
  inHomepage: false,
  shouldDisplayTopBarModal: false,
  shouldDisplayAuthModal: false,
  messageForModal: {},
  authModalType: 'login',
  showTooltips: showTooltips,
};

export default function commonReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOGGLE_IN_HOMEPAGE:
      return {
        ...state,
        inHomepage: !state.inHomepage,
      };
    case types.TOGGLE_TOPBAR_MODAL: {
      return {
        ...state,
        shouldDisplayTopBarModal: !state.shouldDisplayTopBarModal,
      };
    }
    case types.TOGGLE_AUTH_MODAL: {
      return {
        ...state,
        shouldDisplayAuthModal: !state.shouldDisplayAuthModal,
        authModalType: (
          state.shouldDisplayAuthModal ? 'login' : state.authModalType
        ),
      };
    }
    case types.TOGGLE_AUTH_MODAL_TYPE: {
      return {
        ...state,
        authModalType: (state.authModalType === 'login') ? 'signup' : 'login',
      };
    }
    case types.SOCIAL_LOGIN_SUCCESS:
    case types.LOGOUT_SUCCESS: {
      return {
        ...state,
        shouldDisplayTopBarModal: false,
        shouldDisplayAuthModal: false,
        messageForModal: initialState.messageForModal,
      };
    }
    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS: {
      const { user } = action;
      let newTooltips = { ...user.tooltips };
      return {
        ...state,
        showTooltips: newTooltips,
        shouldDisplayTopBarModal: false,
        shouldDisplayAuthModal: false,
        messageForModal: initialState.messageForModal,
      };
    }
    case types.LOGOUT_FAILURE: {
      return {
        ...state,
        messageForModal: action.message,
        shouldDisplayTopBarModal: false,
      };
    }
    case types.FETCH_STREAM_SUCCESS:
    case types.UPDATE_USER_SUCCESS:
    case types.POST_MEDIA_ARENA_SUCCESS:
    case types.FETCH_ARENAS_MEDIA_SUCCESS:
    case types.FETCH_MEDIA_SUCCESS:
    case types.FETCH_ARENAS_SUCCESS:
    case types.ADD_MEDIA:
    case types.UPDATE_MEDIA_SUCCESS:
    case types.DELETE_MEDIA_SUCCESS:
    case types.REPORT_MEDIA_TOGGLE_MODE:
    case types.LOGIN_FAILURE: {
      return {
        ...state,
        messageForModal: initialState.messageForModal,
      };
    }
    case types.FETCH_ARENA_FAILURE:
    case types.FETCH_ARENAS_FAILURE:
    case types.UPDATE_USER_FAILURE:
    case types.GET_PROFILE_FAILURE:
    case types.GET_MY_PROFILE_FAILURE:
    case types.GET_GREENLIT_PEOPLE_FAILURE:
    case types.FETCH_PROFILE_MEDIA_FAILURE:
    case types.FETCH_NOTES_FAILURE:
    case types.FEATURE_NOTES_FAILURE:
    case types.FETCH_ARENAS_MEDIA_FAILURE:
    case types.REPORT_MEDIA_FAILURE:
    case types.POST_MEDIA_ARENA_FAILURE:
    case types.SOCIAL_LOGIN_FAILURE:
    case types.SIGNUP_FAILURE:
    case types.SEND_BLAST_FAILURE:
    case types.TOGGLE_MESSAGE_MODAL: {
      let message = action.message || {};
      return {
        ...state,
        messageForModal: message,
      };
    }
    case types.TOGGLE_TOOLTIP_SUCCESS: {
      const { id } = action;
      let newTooltips = { ...state.showTooltips };
      newTooltips[id] = !state.showTooltips[id];
      return {
        ...state,
        showTooltips: newTooltips,
      };
    }
    default:
      return state;
  }
}
