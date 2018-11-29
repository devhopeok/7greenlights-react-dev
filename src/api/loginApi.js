import api from './apiService.js';

export const login = (loginData) => {
  return api.post('users/sign_in', { user: loginData });
};

export const loginWithFacebook = (accessToken) => {
  return api.post('users/facebook', { access_token: accessToken });
};

export const loginWithInstagram = (accessToken) => {
  return api.post('users/instagram', { access_token: accessToken });
};

export const logout = () => {
  return api.delete('users/sign_out');
};
