import api from './apiService.js';

export const forgotPassword = (email) => {
  return api.post('users/password', { user: email });
};

export const updatePassword = (data) => {
  return api.put('users/password', { user: data });
};
