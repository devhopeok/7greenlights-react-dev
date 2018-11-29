import api from './apiService.js';

export const greenlightArena = (arenaId) => {
  return api.post(`arenas/${arenaId}/greenlight`);
};

export const greenlightMedia = (mediaId) => {
  return api.post(`media_contents/${mediaId}/greenlight`);
};

export const greenlightUser = (userId) => {
  return api.post(`users/${userId}/greenlight`);
};

export const greenlightNote = (noteId) => {
  return api.post(`notes/${noteId}/greenlight`);
};
