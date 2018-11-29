import * as types from '../actions/actionTypes';
import * as helpers from './helpers';
import { profileTabs } from 'constants';

const initialState = {
  currentTab: profileTabs.media,
  profileData: {},
  greenlitPeople: [],
  profileMedia: [],
  currentProfileMediaPage: 1,
};

export default function profileReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SWITCH_PROFILE_TAB: {
      return {
        ...state,
        currentTab: action.id,
      };
    }
    case types.GET_PROFILE_SUCCESS: {
      return {
        ...state,
        profileData: { ...state.profileData, ...action.profileData },
      };
    }
    case types.FETCH_PROFILE_MEDIA_SUCCESS: {
      let { profileMedia, filtered, specificMedia } = action;

      let nextProfileMediaPage =
        state.currentProfileMediaPage +
        ((profileMedia.length === 0 || filtered) ? 0 : 1);

      if (state.currentProfileMediaPage != 1) {
        profileMedia = state.profileMedia.concat(profileMedia);
      }

      if (Object.keys(specificMedia).length !== 0) {
        specificMedia.highlight = true;
        profileMedia = profileMedia.filter(x => x.id !== specificMedia.id);
        profileMedia.unshift(specificMedia);
      }

      return {
        ...state,
        profileMedia: profileMedia,
        currentProfileMediaPage: nextProfileMediaPage,
      };
    }
    case types.GREENLIGHT_USER_TOGGLE:
    case types.GREENLIGHT_USER_REQUEST: {
      const { id } = action;
      let newProfileData = { ...state.profileData };
      if (newProfileData.id == id) {
        newProfileData.greenlit = !newProfileData.greenlit;
        newProfileData.greenlights_received =
          newProfileData.greenlights_received +
          (newProfileData.greenlit ? 1 : -1);
      }

      let newProfileMedia = state.profileMedia.slice();
      newProfileMedia.map((media, index) => {
        media.author = helpers.greenlight(media.author);
        newProfileMedia[index] = { ...media };
      });

      let newGreenlitPeople =
        helpers.greenlightInArrayById(state.greenlitPeople, id);

      return {
        ...state,
        profileData: newProfileData,
        greenlitPeople: newGreenlitPeople,
        profileMedia: newProfileMedia,
      };
    }
    case types.GET_GREENLIT_PEOPLE_SUCCESS: {
      return {
        ...state,
        greenlitPeople: action.greenlitPeople,
      };
    }
    case types.UNMOUNT_PROFILE: {
      return initialState;
    }
    case types.GREENLIGHT_NOTE_REQUEST:
    case types.GREENLIGHT_NOTE_TOGGLE: {
      const { id } = action;
      let newMediaArray = state.profileMedia.slice();
      newMediaArray.forEach(media => {
        let notesArray = media.featured_notes;
        notesArray = helpers.greenlightInArrayById(notesArray, id);
        media.featured_notes = notesArray;
      });

      return {
        ...state,
        profileMedia: newMediaArray,
      };
    }
    case types.GREENLIGHT_MEDIA_REQUEST:
    case types.GREENLIGHT_MEDIA_TOGGLE: {
      const { id } = action;
      let medias = state.profileMedia;
      medias = helpers.greenlightInArrayById(medias, id);
      return {
        ...state,
        profileMedia: medias,
      };
    }
    default:
      return state;
  }
}
