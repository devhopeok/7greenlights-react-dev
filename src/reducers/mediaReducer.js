import * as types from '../actions/actionTypes';
import * as helpers from './helpers';

const initialState = {
  currentWhereLink: '',
  myMedia: [],
  myMediaPage: 1,
  mediaUrl: '',
  editingMedia: {
    name: '',
    media_url: '',
    links: [],
  },
  shouldDisplayUpload: false,
  editingId: null,
  contentType: 0,
  thumbnailUrl: '',
};

export default function mediaReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGOUT_SUCCESS: {
      return {
        ...state,
        myMedia: initialState.myMedia,
      };
    }
    case types.ADD_MEDIA: {
      let newMyMedia = state.myMedia.slice();
      newMyMedia.unshift(action.media);
      return {
        ...state,
        myMedia: newMyMedia,
        shouldDisplayUpload: false,
        mediaUrl: '',
      };
    }

    case types.SET_MEDIA_LINK: {
      let url = action.url;
      let thumbnailUrl = action.thumbnailUrl;
      let contentType = helpers.getMediaContentType(url) || state.contentType;

      return {
        ...state,
        mediaUrl: url,
        contentType,
        thumbnailUrl,
      };
    }
    case types.FETCH_MEDIA_SUCCESS: {
      let { medias, filtered, page, specificMedia } = action;

      let nextMyMediaPage =
        state.myMediaPage +
        ((medias.length === 0 || filtered) ? 0 : 1);

      if (page !== 1) {
        medias = state.myMedia.concat(medias);
      }

      if (Object.keys(specificMedia).length !== 0) {
        specificMedia.highlight = true;
        medias = medias.filter(x => x.id !== specificMedia.id);
        medias.unshift(specificMedia);
      }

      return {
        ...state,
        myMedia: medias,
        myMediaPage: nextMyMediaPage,
      };
    }
    case types.DELETE_MEDIA_SUCCESS: {
      const { id } = action;
      let newMyMedia = state.myMedia.slice();
      newMyMedia = newMyMedia.filter(x => x.id !== id);
      return {
        ...state,
        myMedia: newMyMedia,
      };
    }
    case types.UPDATE_MEDIA_SUCCESS: {
      const media = action.media;
      let newMyMedia = state.myMedia.slice();
      let oldMedia = newMyMedia.find(x => x.id == media.id);
      let index = newMyMedia.indexOf(oldMedia);

      newMyMedia[index] = media;
      return {
        ...state,
        myMedia: newMyMedia,
        editingId: null,
        mediaUrl: '',
        editingMedia: initialState.editingMedia,
      };
    }
    case types.SET_MEDIA_EDIT_MODE: {
      return {
        ...state,
        editingMedia: action.media,
        mediaUrl: action.media.media_url,
        editingId: action.media.id,
        shouldDisplayUpload: false,
      };
    }
    case types.UPDATE_CURRENT_LINK: {
      return {
        ...state,
        currentWhereLink: action.text,
      };
    }
    case types.TOGGLE_EDIT_MEDIA: {
      return {
        ...state,
        editingId: null,
      };
    }
    case types.TOGGLE_SHOW_UPLOAD_MEDIA: {
      let editingMedia;
      let mediaUrl;
      if (state.shouldDisplayUpload || state.editingId) {
        editingMedia = initialState.editingMedia;
        mediaUrl = '';
      } else {
        editingMedia = state.editingMedia;
        mediaUrl = state.mediaUrl;
      }

      return {
        ...state,
        shouldDisplayUpload: !state.shouldDisplayUpload,
        editingMedia: editingMedia,
        mediaUrl: mediaUrl,
        editingId: null,
      };
    }
    case types.GREENLIGHT_MEDIA_REQUEST:
    case types.GREENLIGHT_MEDIA_TOGGLE: {
      const { id } = action;
      let medias = state.myMedia;
      medias = helpers.greenlightInArrayById(medias, id);

      return {
        ...state,
        myMedia: medias,
      };
    }
    case types.GREENLIGHT_NOTE_REQUEST:
    case types.GREENLIGHT_NOTE_TOGGLE: {
      const { id } = action;
      let newMyMedia = state.myMedia.slice();
      newMyMedia.forEach(media => {
        let notesArray = media.featured_notes;
        notesArray = helpers.greenlightInArrayById(notesArray, id);
        media.featured_notes = notesArray;
      });

      return {
        ...state,
        myMedia: newMyMedia,
      };
    }
    default:
      return state;
  }
}
