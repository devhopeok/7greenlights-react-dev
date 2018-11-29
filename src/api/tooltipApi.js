import api from './apiService.js';

export const updateUserTooltips = (id, tooltips) => {
  tooltips[id] = !tooltips[id];
  return api.put('me', { user: { tooltips } });
};
