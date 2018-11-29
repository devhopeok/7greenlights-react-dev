import * as types from '../actions/actionTypes';
import * as helpers from './helpers';

const initialState = {
  featuredNotes: [],
  prevFeaturedNotes: [],
  disregardedNotes: [],
  allNotes: [],
  mediaName: '',
  displayNoteModal: false,
  notesModalMedia: { featured_notes: [{ author: {} }], author: {} },
  notesModalIndex: 0,
  currentPage: 1,
};

export default function logoutReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_NOTES_SUCCESS: {
      let nextPage = state.currentPage + ((action.notes.length === 0) ? 0 : 1);
      let notes = action.notes;
      if (state.currentPage != 1) {
        notes = state.allNotes.concat(notes);
      }

      return {
        ...state,
        allNotes: notes,
        featuredNotes: action.featuredNotes,
        prevFeaturedNotes: action.featuredNotes,
        mediaName: action.mediaName,
        currentPage: nextPage,
      };
    }
    case types.FEATURE_NOTE: {
      let { note, position } = action;
      let featuredNotes = state.featuredNotes.slice();
      let disregardedNotes = state.disregardedNotes.slice();
      let index = disregardedNotes.indexOf(note);
      let allNotes = state.allNotes;
      let allIndex = allNotes.indexOf(note);

      (index != -1) && disregardedNotes.splice(index, 1);

      (allIndex != -1) && allNotes.splice(allIndex, 1);

      (position !== null) ?
        (featuredNotes[position] = note) :
        featuredNotes.push(note);

      return {
        ...state,
        featuredNotes,
        disregardedNotes,
      };
    }
    case types.DISREGARD_NOTE: {
      let { note } = action;
      let featuredNotes = state.featuredNotes.slice();
      let disregardedNotes = state.disregardedNotes.slice();
      let allNotes = state.allNotes.slice();
      let index = featuredNotes.indexOf(note);

      if (index != -1) {
        featuredNotes.splice(index, 1);
        allNotes.push(note);
      }

      disregardedNotes.push(note);

      return {
        ...state,
        featuredNotes,
        allNotes,
        disregardedNotes,
      };
    }
    case types.FEATURE_NOTES_SUCCESS: {
      return {
        ...state,
        prevFeaturedNotes: state.featuredNotes,
      };
    }
    case types.GREENLIGHT_NOTE_REQUEST:
    case types.GREENLIGHT_NOTE_TOGGLE: {
      const { id } = action;
      let arrayList = [state.allNotes, state.featuredNotes,
        state.prevFeaturedNotes, state.disregardedNotes];
      let newArraysList = [];

      arrayList.forEach((array, index) => {
        array = helpers.greenlightInArrayById(array, id);
        newArraysList[index] = array;
      });

      return {
        ...state,
        allNotes: newArraysList[0],
        featuredNotes: newArraysList[1],
        prevFeaturedNotes: newArraysList[2],
        disregardedNotes: newArraysList[3],
      };
    }
    case types.FEATURE_NOTES_FAILURE: {
      return {
        ...state,
        featuredNotes: state.prevFeaturedNotes,
      };
    }
    case types.TOGGLE_NOTE_MODAL: {
      let media = action.media || initialState.notesModalMedia;
      return {
        ...state,
        displayNoteModal: !state.displayNoteModal,
        notesModalMedia: media,
        notesModalIndex: action.index,
      };
    }
    default:
      return state;
  }
}
