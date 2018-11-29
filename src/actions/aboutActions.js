import * as types from './actionTypes';

export function switchTab(nextTab) {
  return {
    type: types.SWITCH_ABOUT_TAB,
    nextTab,
  };
}
