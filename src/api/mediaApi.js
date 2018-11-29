import api from './apiService.js';
import { paginate, applyFilters, applySorting,
  applyArrayFilters, applySpecificMedia } from './apiHelpers';
import * as constants from '../constants.js';

export const uploadMedia = (media) => {
  return api.post('me/media_contents', { media_content: media });
};

export const fetchMedia = (page, filters, sortType, sortOrder, specificMedia,
  typeIds = [], perPage = 20) => {
  let url = 'me/media_contents';
  url = paginate(url, page, perPage);
  url = applySorting(url, sortType, sortOrder);
  url = applyFilters(url, filters);
  url = applyArrayFilters(url, constants.mediaFilters.types, typeIds);
  url = applySpecificMedia(url, specificMedia);
  return api.get(url);
};

export const deleteMedia = (id) => {
  return api.delete(`me/media_contents/${id}`);
};

export const updateMedia = (media) => {
  return api.put(`me/media_contents/${media.id}`, { media_content: media });
};

export const reportMedia = (mediaContentId, report) => {
  return api.post(
    `media_contents/${mediaContentId}/report`, { report }
  );
};

export const uploadMediaNote = (mediaContentId, noteData) => {
  return api.post(`media_contents/${mediaContentId}/notes`, noteData, true);
};
