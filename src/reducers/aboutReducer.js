import * as types from '../actions/actionTypes';

const initialState = {
  selectedTab: 'about',
};

export default function aboutReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SWITCH_ABOUT_TAB:
      return {
        selectedTab: action.nextTab,
      };
    default:
      return state;
  }
}
