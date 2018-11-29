import api from './apiService.js';
import { paginate, notesToObject } from './apiHelpers';

export const fetchNotes = (mediaId, page, perPage = 50) => {
  let url = `media_contents/${mediaId}/notes`;
  url = paginate(url, page, perPage);
  return api.get(url);
};

export const featureNotes = (notes, disregardedNotes, mediaId) => {
  return api.put(`media_contents/${mediaId}/notes/update`,
    notesToObject(notes, disregardedNotes));
};
