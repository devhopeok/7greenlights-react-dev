import api from './apiService.js';
import * as constants from '../constants.js';
import { applyFilters, applySorting, paginate,
  applyArrayFilters } from './apiHelpers';

export const fetchStream = (page, filters, sortType, sortOrder,
  arenaIds = [], typeIds = [], perPage = 20) => {

  let url = 'me/streams';
  url = paginate(url, page, perPage);
  url = applySorting(url, sortType, sortOrder);
  url = applyFilters(url, filters);
  url = applyArrayFilters(url, constants.mediaFilters.arenas, arenaIds);
  url = applyArrayFilters(url, constants.mediaFilters.types, typeIds);

  return api.get(url);
};
