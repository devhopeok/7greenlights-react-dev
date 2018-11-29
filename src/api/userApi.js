import api from './apiService.js';
import { paginate, applySorting, applyFilters,
  applySpecificMedia } from './apiHelpers';

const parseSignupData = (signupData) => {
  let newSignupData = { ...signupData };

  newSignupData.birthday =
    `${newSignupData.dob_day}/${newSignupData.dob_month}/${newSignupData.dob_year}`;
  delete newSignupData.dob_year;
  delete newSignupData.dob_month;
  delete newSignupData.dob_day;

  return newSignupData;
};

export const signup = (signupData) => {
  return api.post('users', { user: parseSignupData(signupData) });
};

export const updateUser = (userData) => {
  return api.put('me', { user: userData });
};

export const updateUserPicture = (userData) => {
  return api.put('me', userData, true);
};

export const getMyProfile = () => {
  return api.get('me');
};

export const getProfile = (userId) => {
  return api.get(`users/${userId}`);
};

export const getGreenlitPeople = (userId) => {
  return api.get(`users/${userId}/greenlights/users`);
};

export const getMyGreenlitPeople = () => {
  return api.get('me/greenlights/users');
};

export const getMyNotifications = (page, perPage = 20) => {
  let url = 'me/notifications';
  url = paginate(url, page, perPage);
  return api.get(url);
};

export const fetchProfileMedia = (userId, page, filters, sortType, sortOrder,
  specificMedia = null, perPage = 20) => {
  let url = `users/${userId}/media_contents`;
  url = paginate(url, page, perPage);
  url = applySorting(url, sortType, sortOrder);
  url = applyFilters(url, filters);
  url = applySpecificMedia(url, specificMedia);
  return api.get(url);
};
