import api from './apiService.js';

export const sendBlast = (blast) => {
  return api.post('me/blasts', { blast });
};
