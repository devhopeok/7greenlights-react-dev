import * as types from './actionTypes';
import * as arenaApi from '../api/arenaApi';
import { fetchArenasMedia } from './mediaActions';
import { toggleLoadingIndicator, toggleMessageModal } from './commonActions';
import * as constants from '../constants';

export function fetchArenasFailure(message) {
  return {
    type: types.FETCH_ARENAS_FAILURE,
    message,
  };
}

export function fetchArenasSuccess(arenas, page, filtered = false) {
  return {
    type: types.FETCH_ARENAS_SUCCESS,
    arenas,
    page,
    filtered,
  };
}

export function fetchFeaturedArenasSuccess(arenas) {
  return {
    type: types.FETCH_FEATURED_ARENAS_SUCCESS,
    arenas,
  };
}

export function addArenasUserPosted(arenas) {
  return {
    type: types.FETCH_ARENAS_USER_POSTED_SUCCESS,
    arenas,
  };
}

export function resetArenasPage() {
  return {
    type: types.RESET_ARENAS_PAGE,
  };
}

export function fetchArenaRequest() {
  return {
    type: types.FETCH_ARENA_REQUEST,
  };
}

export function fetchArenaFailure(message) {
  return {
    type: types.FETCH_ARENA_FAILURE,
    message,
  };
}

export function fetchArenaSuccess(arena) {
  return {
    type: types.FETCH_ARENA_SUCCESS,
    arena,
  };
}

export function togglePostToArena() {
  return {
    type: types.TOGGLE_POST_TO_ARENA,
  };
}

export function postMediaToArenaRequest() {
  return {
    type: types.POST_MEDIA_ARENA_REQUEST,
  };
}

export function postMediaToArenaSuccess(medias) {
  return {
    type: types.POST_MEDIA_ARENA_SUCCESS,
    medias,
  };
}

export function postMediaToArenaFailure(message) {
  return {
    type: types.POST_MEDIA_ARENA_FAILURE,
    message,
  };
}

export function addMediaToPost(id) {
  return {
    type: types.ADD_MEDIA_TO_POST,
    id,
  };
}

export function removeMediaToPost(id) {
  return {
    type: types.REMOVE_MEDIA_TO_POST,
    id,
  };
}

export function fetchArena(id, filterSortData) {
  return (dispatch) => {
    dispatch(fetchArenaRequest());

    return arenaApi.fetchArena(id)
      .then((response) => {
        dispatch(fetchArenaSuccess(response));
        const page = 1;
        dispatch(fetchArenasMedia(id, page, filterSortData));
      })
      .catch((error) => {
        dispatch(fetchArenaFailure(error));
        console.error(error);
      });
  };
}

export function fetchArenasWhereUserPosted() {
  return (dispatch) => {
    let page = 1;
    let userPostedFilter = [constants.userPostedFilterId];
    return arenaApi.fetchArenas(page, userPostedFilter)
      .then((response) => {
        dispatch(addArenasUserPosted(response.arenas));
      })
      .catch((error) => {
        dispatch(fetchArenasFailure(error));
        console.error(error);
      });
  };
}

export function fetchArenas(page, filter, sortType, sortOrder, filtered = false) {
  return (dispatch) => {
    filtered && dispatch(toggleLoadingIndicator());
    return arenaApi.fetchArenas(page, filter, sortType, sortOrder)
      .then((response) => {
        dispatch(fetchArenasSuccess(response.arenas, page, filtered));

        let isFirst = !filtered && page === 1;
        isFirst &&
          dispatch(fetchFeaturedArenas())
            .then(dispatch(fetchArenasWhereUserPosted()));
      })
      .catch((error) => {
        dispatch(fetchArenasFailure(error));
        console.error(error);
      });
  };
}

export function fetchFeaturedArenas(page = 1) {
  return (dispatch) => {
    return arenaApi.fetchFeaturedArenas(page)
      .then((response) => {
        dispatch(fetchFeaturedArenasSuccess(response.arenas));
      })
      .catch((error) => {
        dispatch(fetchArenasFailure(error));
        console.error(error);
      });
  };
}

export function postMediaToArena(data) {
  return (dispatch) => {
    if (!data.medias.length) {
      alert('You must select at least one of your media to post');
    } else {
      dispatch(postMediaToArenaRequest());
      dispatch(toggleLoadingIndicator());
      return arenaApi.postMediaToArena(data)
      .then(() => {
        const hasReported = hasReportedMedia(data.medias);
        dispatch(postMediaToArenaSuccess(data.medias));
        hasReported && dispatch(toggleMessageModal({
          text: 'Some of the media you posted is reported by another user. These won\'t be visible in the Venue™ until the admin solves the report.',
        }));
      })
      .catch((error) => {
        dispatch(postMediaToArenaFailure({
          title: 'Oops',
          text: 'There was an error posting this media to the Venue™, try again',
        }));
        console.error(error);
      });
    }
  };
}

function hasReportedMedia(medias) {
  const reported = medias.filter(x => x.reported);
  return Boolean(reported.length);
}
