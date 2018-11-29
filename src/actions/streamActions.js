import * as types from './actionTypes';
import * as streamApi from '../api/streamApi';
import { toggleMessageModal, toggleLoadingIndicator } from './commonActions';

export function fetchStreamSuccess(stream, arenas, page, filtered) {
  return {
    type: types.FETCH_STREAM_SUCCESS,
    stream,
    arenas,
    page,
    filtered,
  };
}

export function fetchStream(page, filters, sortType, sortOrder, arenaIds,
  typeIds, filtered = false) {
  return (dispatch) => {
    filtered && (page = 1);
    filtered && dispatch(toggleLoadingIndicator());
    return streamApi.fetchStream(page, filters, sortType, sortOrder, arenaIds,
      typeIds)
      .then((response) => {
        dispatch(fetchStreamSuccess(response.stream, response.arenas, page,
          filtered));
      })
      .catch((error) => {
        console.log(error);
        dispatch(toggleMessageModal(error));
      });
  };
}
