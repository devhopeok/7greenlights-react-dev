import * as types from '../actions/actionTypes';
import * as helpers from './helpers';

const initialState = {
  arenas: [],
  arenasPage: 1,
  recentArenas: [],
  postedArenas: [],
  currentArena: {
    id: 0,
    greenlights_count: 0,
    media_contents: [],
  },
  currentArenaMediaPage: 1,
  displayPostToArena: false,
  mediasToPost: [],
  currentMyMediaPage: 1,
};

export default function arenasReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_ARENAS_SUCCESS: {
      const { page, filtered, arenas } = action;
      let arenasArray = state.arenas.slice();
      let nextArenaPage = state.arenasPage + 1;
      let recentArenas = state.recentArenas;
      let isFirst = (page == 1 && !filtered);

      if ((action.arenas.length === 0 && !isFirst) || filtered) {
        nextArenaPage = state.arenasPage;
      }

      if (page === 1 && filtered) {
        arenasArray = arenas;
      } else if (isFirst) {
        arenasArray = arenas;
        recentArenas = arenasArray.splice(0, 3);
      } else {
        arenasArray = arenasArray.concat(arenas);
      }

      return {
        ...state,
        arenas: arenasArray,
        arenasPage: nextArenaPage,
        recentArenas,
      };
    }
    case types.FETCH_FEATURED_ARENAS_SUCCESS: {
      let { arenas } = action;
      let arenasArray = state.arenas.slice();
      arenasArray = arenas.concat(arenasArray);

      return {
        ...state,
        arenas: arenasArray,
      };
    }
    case types.FETCH_ARENAS_USER_POSTED_SUCCESS: {
      let { arenas } = action;
      const maxAllowed = 3;
      (arenas.length > maxAllowed) && (arenas = arenas.splice(0, maxAllowed));

      let newRecentArenas = state.recentArenas.slice();
      let newArenas = state.arenas.slice();
      let lacking = maxAllowed - arenas.length;

      if (lacking > 0) {
        let moving = newArenas.splice(0, lacking);
        newRecentArenas = newRecentArenas.concat(moving);
      }

      return {
        ...state,
        postedArenas: arenas,
        arenas: newArenas,
        recentArenas: newRecentArenas,
      };
    }
    case types.RESET_ARENAS_PAGE: {
      return {
        ...state,
        arenasPage: initialState.arenasPage,
        currentArenaMediaPage: initialState.currentArenaMediaPage,
        currentMyMediaPage: initialState.currentMyMediaPage,
      };
    }
    case types.GREENLIGHT_ARENA_REQUEST:
    case types.GREENLIGHT_ARENA_TOGGLE: {
      let id = action.id;

      let newArenas = helpers.greenlightInArrayById(state.arenas, id);
      let newRecentArenas =
        helpers.greenlightInArrayById(state.recentArenas, id);
      let newPostedArenas =
        helpers.greenlightInArrayById(state.postedArenas, id);

      let newCurrentArena = { ...state.currentArena };
      if (state.currentArena.id === id) {
        newCurrentArena = helpers.greenlight(newCurrentArena);
      }

      return {
        ...state,
        arenas: newArenas,
        recentArenas: newRecentArenas,
        postedArenas: newPostedArenas,
        currentArena: newCurrentArena,
      };
    }
    case types.FETCH_ARENA_SUCCESS: {
      let arena = action.arena;
      if (!arena.media_contents) {
        arena.media_contents = [];
      }

      return {
        ...state,
        currentArena: action.arena,
      };
    }
    case types.TOGGLE_POST_TO_ARENA: {
      return {
        ...state,
        displayPostToArena: !state.displayPostToArena,
      };
    }
    case types.POST_MEDIA_ARENA_REQUEST: {
      return {
        ...state,
        displayPostToArena: false,
      };
    }
    case types.FETCH_ARENAS_MEDIA_SUCCESS: {
      const { currentArena } = state;
      let { page, media, filtered } = action;
      let nextArenaMediaPage =
        state.currentArenaMediaPage +
        ((media.length === 0 || filtered) ? 0 : 1);

      let newCurrentArena = { ...currentArena };
      if (page !== 1) {
        media = newCurrentArena.media_contents.concat(media);
      }
      newCurrentArena.media_contents = media;

      return {
        ...state,
        currentArena: newCurrentArena,
        currentArenaMediaPage: nextArenaMediaPage,
      };
    }
    case types.GREENLIGHT_MEDIA_TOGGLE:
    case types.GREENLIGHT_MEDIA_REQUEST: {
      const id = action.id;
      let newCurrentArena = { ...state.currentArena };
      let mediaContents = newCurrentArena.media_contents;
      mediaContents = helpers.greenlightInArrayById(mediaContents, id);
      newCurrentArena.media_contents = mediaContents;

      let mediaContent = newCurrentArena.media_contents.find(x => x.id === id);
      if (mediaContent) {
        mediaContent.greenlit ?
        newCurrentArena.media_contents_greenlights_count++ :
        newCurrentArena.media_contents_greenlights_count-- ;
      }

      return {
        ...state,
        currentArena: newCurrentArena,
      };
    }
    case types.ADD_MEDIA_TO_POST: {
      let newMediasToPost = state.mediasToPost.slice();
      newMediasToPost.push(action.id);

      return {
        ...state,
        mediasToPost: newMediasToPost,
      };
    }
    case types.REMOVE_MEDIA_TO_POST: {
      let newMediasToPost = state.mediasToPost.slice();
      newMediasToPost = newMediasToPost.filter(x => x !== action.id);

      return {
        ...state,
        mediasToPost: newMediasToPost,
      };
    }
    case types.POST_MEDIA_ARENA_SUCCESS: {
      let newCurrentArena = { ...state.currentArena };
      let newMediaContent = action.medias.concat(newCurrentArena.media_contents);
      newCurrentArena.media_contents = newMediaContent;
      newCurrentArena.media_content_count++;

      return {
        ...state,
        mediasToPost: [],
        displayPostToArena: false,
        currentArena: newCurrentArena,
      };
    }
    case types.POST_MEDIA_ARENA_FAILURE: {
      return {
        ...state,
        mediasToPost: [],
        displayPostToArena: false,
      };
    }
    case types.GREENLIGHT_USER_TOGGLE:
    case types.GREENLIGHT_USER_REQUEST: {
      let id = action.id;
      let newCurrentArena = { ...state.currentArena };
      let mediaContents = newCurrentArena.media_contents.slice();
      mediaContents.map((media, index) => {
        if (media.author.id == id) {
          media.author = helpers.greenlight(media.author);
          mediaContents[index] = { ...media };
        }
      });

      newCurrentArena.media_contents = mediaContents;

      return {
        ...state,
        currentArena: newCurrentArena,
      };
    }
    case types.GREENLIGHT_NOTE_REQUEST:
    case types.GREENLIGHT_NOTE_TOGGLE: {
      const id = action.id;
      let newCurrentArena = { ...state.currentArena };
      let newMediaArray = newCurrentArena.media_contents.slice();
      newMediaArray.forEach(media => {
        let notesArray = media.featured_notes;
        notesArray = helpers.greenlightInArrayById(notesArray, id);
        media.featured_notes = notesArray;
      });

      newCurrentArena.media_contents = newMediaArray;

      return {
        ...state,
        currentArena: newCurrentArena,
      };
    }
    case types.FETCH_MEDIA_SUCCESS: {
      let { medias } = action;

      let newCurrentMyMediaPage =
        state.currentMyMediaPage +
        ((medias.length === 0) ? 0 : 1);

      return {
        ...state,
        currentMyMediaPage: newCurrentMyMediaPage,
      };
    }
    default:
      return state;
  }
}
