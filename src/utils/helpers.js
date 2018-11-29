import * as constants from '../constants';

export const preventBoth = (filterId, enabled, toggleFilter) => {
  // this method prevents having both options active at the
  // same time in a radio button.
  const { arenasFiltersIds: { greenlit }, oppositeFilters } = constants;
  const hasOppositeOption = (filterId !== greenlit);

  if (hasOppositeOption) {
    let oppositeOptions = oppositeFilters.filter(elem => elem.includes(filterId));
    oppositeOptions[0].forEach(criteria => {
      if ((criteria !== filterId) && enabled.includes(criteria)) {
        toggleFilter(criteria);
      }
    });
    toggleFilter(filterId);
  } else {
    toggleFilter(filterId);
  }
};

export const urlMediaSource = url => {
  const medias = constants.supportedMediaSources;
  for (let source in medias) {
    if (medias[source].urlPieces.find(substring => url.indexOf(substring) !== -1)) {
      return medias[source];
    }
  }
  return false;
};

export const urlIsSpotify = url => {
  const medias = constants.supportedMediaSources;
  return urlMediaSource(url) === medias.spotify;
};

export const urlIsVimeo = url => {
  const medias = constants.supportedMediaSources;
  return urlMediaSource(url) === medias.vimeo;
};

export const urlIsSoundCloud = url => {
  const medias = constants.supportedMediaSources;
  return urlMediaSource(url) === medias.soundcloud;
};

export const urlIsYoutube = url => {
  const medias = constants.supportedMediaSources;
  return urlMediaSource(url) === medias.youtube;
};

// took from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
export const getParameterByName = (name, url) => {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const mediaLink = (profileId, mediaId, isMine = false) =>
  isMine ?
  `/mymedia?media=${mediaId}` :
  `/profile/${profileId}?media=${mediaId}`;

export const notificationLink = (notification) => {
  const { notificationTypes } = constants;
  const type = notification.notification_type;
  const profileId = notification.sender_id;
  let mediaId = notification.media_content_id;

  switch (type) {
    case notificationTypes.MEDIA_CONTENT_GL: {
      mediaId = notification.event_entity_id;
      return mediaLink(profileId, mediaId, true);
    }
    case notificationTypes.NOTE_FEATURED: {
      return mediaLink(profileId, mediaId);
    }
    case notificationTypes.NOTE_GREENLIT: {
      return mediaLink(profileId, mediaId);
    }
    case notificationTypes.NOTE_UPLOADED: {
      return `/media/${mediaId}/notes`;
    }
    case notificationTypes.USER_GREENLIT: {
      return `/profile/${profileId}`;
    }
  }
};
