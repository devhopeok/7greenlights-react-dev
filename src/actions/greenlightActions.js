import * as types from './actionTypes';
import * as greenlightApi from '../api/greenlightApi';

export function greenlightArenaRequest(arenaId) {
  return {
    type: types.GREENLIGHT_ARENA_REQUEST,
    id: arenaId,
  };
}

export function toggleGreenlightArena(arenaId) {
  return {
    type: types.GREENLIGHT_ARENA_TOGGLE,
    id: arenaId,
  };
}

export function greenlightMediaRequest(mediaId) {
  return {
    type: types.GREENLIGHT_MEDIA_REQUEST,
    id: mediaId,
  };
}

export function toggleGreenlightMedia(mediaId) {
  return {
    type: types.GREENLIGHT_MEDIA_TOGGLE,
    id: mediaId,
  };
}

export function greenlightUserRequest(userId) {
  return {
    type: types.GREENLIGHT_USER_REQUEST,
    id: userId,
  };
}

export function toggleGreenlightUser(userId) {
  return {
    type: types.GREENLIGHT_USER_TOGGLE,
    id: userId,
  };
}

export function greenlightNoteRequest(noteId) {
  return {
    type: types.GREENLIGHT_NOTE_REQUEST,
    id: noteId,
  };
}

export function toggleGreenlightNote(noteId) {
  return {
    type: types.GREENLIGHT_NOTE_TOGGLE,
    id: noteId,
  };
}

export function greenlightMedia(mediaId) {
  return (dispatch) => {
    dispatch(greenlightMediaRequest(mediaId));

    return greenlightApi.greenlightMedia(mediaId)
      .then(() => {
        return;
      })
      .catch((error) => {
        dispatch(toggleGreenlightMedia(mediaId));
        console.log(error);
      });
  };
}

export function greenlightArena(arenaId) {
  return (dispatch) => {
    dispatch(greenlightArenaRequest(arenaId));

    return greenlightApi.greenlightArena(arenaId)
      .then(() => {
        return;
      })
      .catch((error) => {
        dispatch(toggleGreenlightArena(arenaId));
        console.log(error);
      });
  };
}

export function greenlightUser(userId) {
  return (dispatch) => {
    dispatch(greenlightUserRequest(userId));

    return greenlightApi.greenlightUser(userId)
      .then(() => {
        return;
      })
      .catch((error) => {
        dispatch(toggleGreenlightUser(userId));
        console.log(error);
      });
  };
}

export function greenlightNote(noteId) {
  return (dispatch) => {
    dispatch(greenlightNoteRequest(noteId));

    return greenlightApi.greenlightNote(noteId)
      .then(() => {
        return;
      })
      .catch((error) => {
        dispatch(toggleGreenlightNote(noteId));
        console.log(error);
      });
  };
}
