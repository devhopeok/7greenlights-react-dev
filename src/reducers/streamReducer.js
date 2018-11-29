import * as types from '../actions/actionTypes';
import * as helpers from './helpers';

const initialState = {
  myStream: [],
  myStreamPage: 1,
  arenas: [],
};

export default function streamReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GREENLIGHT_MEDIA_REQUEST:
    case types.GREENLIGHT_MEDIA_TOGGLE: {
      const id = action.id;
      let newStream = state.myStream.slice();
      let media = newStream.find(x => x.id === id);
      let index = newStream.indexOf(media);
      if (index !== -1 && media.greenlit) {
        newStream.splice(index, 1);
      }

      return {
        ...state,
        myStream: newStream,
      };
    }
    case types.FETCH_STREAM_SUCCESS: {
      let { stream } = action;
      const { arenas, page, filtered } = action;

      let nextMyStreamPage =
        state.myStreamPage + ((stream.length === 0 || filtered) ? 0 : 1);

      if (page !== 1) {
        stream = state.myStream.concat(stream);
      }

      return {
        ...state,
        myStream: stream,
        arenas: arenas,
        myStreamPage: nextMyStreamPage,
      };
    }
    case types.GREENLIGHT_NOTE_REQUEST:
    case types.GREENLIGHT_NOTE_TOGGLE: {
      const id = action.id;
      let newMediaArray = state.myStream.slice();
      newMediaArray.forEach(media => {
        let notesArray = media.featured_notes;
        notesArray = helpers.greenlightInArrayById(notesArray, id);
        media.featured_notes = notesArray;
      });

      return {
        ...state,
        myStream: newMediaArray,
      };
    }
    case types.GREENLIGHT_USER_TOGGLE:
    case types.GREENLIGHT_USER_REQUEST: {
      let { id } = action;
      let newMyStream = state.myStream.slice();
      newMyStream.map((media, index) => {
        if (media.author.id == id) {
          media.author = helpers.greenlight(media.author);
          newMyStream[index] = { ...media };
        }
      });

      return {
        ...state,
        myStream: newMyStream.slice(),
      };
    }
    default:
      return state;
  }
}
