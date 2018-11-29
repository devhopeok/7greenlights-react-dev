import * as types from './actionTypes';
import * as mediaApi from '../api/mediaApi';
import * as arenaApi from '../api/arenaApi';
import { toggleMessageModal, toggleLoadingIndicator } from './commonActions';
import axios from 'axios';
import Config from 'Config';
import spotifyUri from 'spotify-uri';
import * as helpers from 'utils/helpers';

export function addMedia(media) {
  return {
    type: types.ADD_MEDIA,
    media,
  };
}

export function fetchMediaSuccess(medias, filtered, page, specificMedia) {
  return {
    type: types.FETCH_MEDIA_SUCCESS,
    medias,
    filtered,
    page,
    specificMedia
  };
}

export function setMediaLink(url, thumbnailUrl) {
  return {
    type: types.SET_MEDIA_LINK,
    url,
    thumbnailUrl,
  };
}

export function removeMediaLink(link) {
  return {
    type: types.REMOVE_MEDIA_LINK,
    link,
  };
}

export function updateCurrentLink(text) {
  return {
    type: types.UPDATE_CURRENT_LINK,
    text,
  };
}

export function deleteMediaSuccess(id) {
  return {
    type: types.DELETE_MEDIA_SUCCESS,
    id,
  };
}

export function updateMediaSuccess(media) {
  return {
    type: types.UPDATE_MEDIA_SUCCESS,
    media,
  };
}

export function setEditMode(media) {
  return {
    type: types.SET_MEDIA_EDIT_MODE,
    media,
  };
}

export function toggleUploadMedia() {
  return {
    type: types.TOGGLE_SHOW_UPLOAD_MEDIA,
  };
}

export function toggleEditMedia() {
  return {
    type: types.TOGGLE_EDIT_MEDIA,
  };
}

export function fetchArenasMediaFailure() {
  return {
    type: types.FETCH_ARENAS_MEDIA_FAILURE,
    error: 'Fetching venues failed, please try again'
  };
}

export function fetchArenasMediaSuccess(media, filtered, page) {
  return {
    type: types.FETCH_ARENAS_MEDIA_SUCCESS,
    media,
    filtered,
    page,
  };
}

export function toggleReportModalMode() {
  return {
    type: types.REPORT_MEDIA_TOGGLE_MODE,
  };
}

export function toggleReportModal(id) {
  return {
    type: types.TOGGLE_REPORT_MODAL,
    mediaId: id,
  };
}

export function reportMediaFailure() {
  return {
    type: types.REPORT_MEDIA_FAILURE,
  };
}

export function uploadMedia(media) {
  return (dispatch) => {
    dispatch(toggleLoadingIndicator());
    return mediaApi.uploadMedia(media)
      .then((response) => {
        dispatch(addMedia(response));
      })
      .catch((error) => {
        dispatch(toggleMessageModal({
            title: 'Oops',
            text: 'There was an issue uploading your media, please try again',
          }));
        console.log(error);
      });
  };
}

export function fetchMedia(page, filters, sortType, sortOrder,
  typeIds, specificMediaId, filtered = false) {
  return (dispatch) => {
    filtered && (page = 1);
    filtered && dispatch(toggleLoadingIndicator());
    return mediaApi.fetchMedia(page, filters, sortType, sortOrder,
      specificMediaId, typeIds)
      .then((response) => {
        dispatch(fetchMediaSuccess(response.media_contents, filtered, page,
          response.media_requested));
      })
      .catch((error) => {
        console.log(error);
        dispatch(toggleMessageModal(error));
      });
  };
}

export function deleteMedia(id) {
  let answer = confirm('Are you sure you want to delete this media content?');
  if (answer) {
    return (dispatch) => {
      dispatch(toggleLoadingIndicator());
      return mediaApi.deleteMedia(id)
        .then(() => {
          dispatch(deleteMediaSuccess(id));
        })
        .catch((error) => {
          console.log(error);
          dispatch(toggleMessageModal({
            title: 'Oops',
            text: 'There was an issue deleting your media, please try again',
          }));
        });
    };
  }
}

export function updateMedia(media) {
  return (dispatch) => {
    dispatch(toggleLoadingIndicator());
    return mediaApi.updateMedia(media)
      .then(() => {
        dispatch(updateMediaSuccess(media));
      })
      .catch((error) => {
        console.log(error);
        dispatch(toggleMessageModal({
            title: 'Oops',
            text: 'There was an issue updating your media, please try again',
          }));
      });
  };
}

export function fetchArenasMedia(arenaId, page, filterSortData,
  filtered = false) {
  return (dispatch) => {
    filtered && dispatch(toggleLoadingIndicator());
    return arenaApi.fetchArenasMedia(arenaId, page, filterSortData)
      .then((response) => {
        dispatch(
          fetchArenasMediaSuccess(response.media_contents, filtered, page)
        );
      })
      .catch((error) => {
        dispatch(fetchArenasMediaFailure(error));
        console.error(error);
      });
  };
}

export function reportMedia(mediaId, report) {
  return (dispatch) => {
    dispatch(toggleLoadingIndicator());
    return mediaApi.reportMedia(mediaId, report)
      .then(() => {
        dispatch(toggleReportModalMode());
      })
      .catch((error) => {
        dispatch(reportMediaFailure({
          title: 'Oops',
          text: 'There was an issue reporting this media, please try again',
        }));
        console.log(error);
      });
  };
}

export function uploadNote(mediaId, noteData) {
  return (dispatch) => {
    dispatch(toggleLoadingIndicator());
    return mediaApi.uploadMediaNote(mediaId, noteData)
      .then(() => dispatch(toggleMessageModal({
        text: 'Note™ submitted successfully!',
      })))
      .catch((error) => {
        dispatch(toggleMessageModal({
          title: 'Oops',
          text: 'There was an error submitting your Note™, please try again'
        }));
        console.error(error);
      });
  };
}

export function fetchMediaInfo(url) {
  return (dispatch) => {
    return getThumbnail(url)
      .then(thumbnailUrl => dispatch(setMediaLink(url, thumbnailUrl)))
      .catch(console.error);
  };
}

const getThumbnail = (url) => {
  if (helpers.urlIsSoundCloud(url)) {
    const clientId = Config.soundCloudClientId;
    const resolveUrl =
      `https://api.soundcloud.com/resolve?url=${url}&client_id=${clientId}`;

    return axios.get(resolveUrl).then(
      response => {
        const { data } = response;
        return Promise.resolve(data.artwork_url);
      }
    );

  } else if (helpers.urlIsYoutube(url)) {

    let videoId = url.split('v=')[1];
    let ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition != -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    return Promise.resolve(`http://img.youtube.com/vi/${videoId}/0.jpg`);

  } else if (helpers.urlIsVimeo(url)) {
    const regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
    let match = url.match(regExp);
    let videoId = match && match[2];
    let apiUrl = videoId && `http://vimeo.com/api/v2/video/${videoId}.json`;

    return axios.get(apiUrl).then(response => {
      return response.data[0].thumbnail_medium;
    });
  } else if (helpers.urlIsSpotify(url)) {
    const baseEndpoint = 'https://api.spotify.com/v1';
    let parsed = spotifyUri.parse(url);
    return axios.get(`${baseEndpoint}/${parsed.type}s/${parsed.id}`)
      .then(response => {
        return Promise.resolve(response.data.album.images[1].url);
      });
  }

  return Promise.resolve();
};
