import * as types from './actionTypes';
import * as notesApi from '../api/notesApi';
import { toggleMessageModal, toggleLoadingIndicator } from './commonActions';

export function fetchNotesSuccess(notes, featuredNotes, mediaName) {
  return {
    type: types.FETCH_NOTES_SUCCESS,
    notes,
    featuredNotes,
    mediaName,
  };
}

export function fetchNotesFailure(message) {
  return {
    type: types.FETCH_NOTES_FAILURE,
    message,
  };
}

export function featureNote(note, position = null) {
  return {
    type: types.FEATURE_NOTE,
    note,
    position,
  };
}

export function disregardNote(note) {
  return {
    type: types.DISREGARD_NOTE,
    note,
  };
}

export function featureNotesSuccess() {
  return {
    type: types.FEATURE_NOTES_SUCCESS,
  };
}

export function featureNotesFailure(message) {
  return {
    type: types.FEATURE_NOTES_FAILURE,
    message,
  };
}

export function toggleNoteModal(media = null, index = 0) {
  return {
    type: types.TOGGLE_NOTE_MODAL,
    media,
    index,
  };
}

export function fetchNotes(mediaId, page) {
  return (dispatch) => {
    return notesApi.fetchNotes(mediaId, page)
      .then((response) => {
        dispatch(
          fetchNotesSuccess(response.notes, response.featured_notes,
            response.media_content.name)
        );
      })
      .catch((error) => {
        dispatch(fetchNotesFailure(error));
        console.error(error);
      });
  };
}

export function featureNotes(notes, disregardedNotes, mediaId) {
  return (dispatch) => {
    dispatch(toggleLoadingIndicator());
    return notesApi.featureNotes(notes, disregardedNotes, mediaId)
      .then(() => {
        dispatch(featureNotesSuccess());
        dispatch(toggleMessageModal(
          { text: 'Featured Notes™ updated successfully!' }
        ));
      })
      .catch((error) => {
        dispatch(featureNotesFailure({
          title: 'Oops',
          text: 'There was an error featuring these Notes™, try again later',
        }));
        console.error(error);
      });
  };
}
