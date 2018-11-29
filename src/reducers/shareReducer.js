import * as types from '../actions/actionTypes';

const initialState = {
  displayShareModal: false,
  sharingObject: null,
  content: null,
};

export default function shareReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOGGLE_SHARE_MODAL: {
      return {
        ...state,
        sharingObject: action.media,
        displayShareModal: !state.displayShareModal,
      };
    }
    default:
      return state;
  }
}
