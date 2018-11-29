import * as constants from '../constants';
import * as helpers from 'utils/helpers';

export const greenlight = (object) => {
  let newObject = { ...object };
  newObject.greenlit = !newObject.greenlit;
  newObject.greenlights_count += (newObject.greenlit ? 1 : -1);

  return newObject;
};

export const greenlightInArrayById = (array, objectId) => {
  let newArray = array.slice();
  let object = newArray.find(x => x.id === objectId);

  if (object) {
    let index = newArray.indexOf(object);
    object = greenlight(object);

    newArray[index] = object;
  }

  return newArray;
};

export const getMediaContentType = (url) => {
  let contentType;

  if (helpers.urlIsSpotify(url) || helpers.urlIsSoundCloud(url)) {
    contentType = constants.contentTypes.music;
  } else if (helpers.urlIsYoutube(url) || helpers.urlIsVimeo(url)) {
    contentType = constants.contentTypes.video;
  } else {
    contentType = constants.contentTypes.other;
  }
  return contentType;
};
