import * as types from '../actions/actionTypes';

const initialState = {
  displayReportModal: false,
  reportError: false,
  done: false,
  mediaId: null,
};

export default function reportReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOGGLE_REPORT_MODAL: {
      let mediaId = action.mediaId;

      return {
        displayReportModal: !state.displayReportModal,
        reportError: false,
        done: false,
        mediaId,
      };
    }
    case types.REPORT_MEDIA_FAILURE: {
      return {
        ...state,
        reportError: true,
        done: true,
      };
    }
    case types.REPORT_MEDIA_TOGGLE_MODE: {
      return {
        ...state,
        done: !state.done,
      };
    }
    default:
      return state;
  }
}
