import api from './apiService.js';
import * as constants from '../constants';
import { applyFilters, applyArrayFilters, applySorting,
  paginate } from './apiHelpers';

export const fetchArena = (id) => {
  return api.get(`arenas/${id}`);
};

export const fetchArenas = (page, filters, sortType, sortOrder = 1,
 perPage = 20) => {
  let url = 'arenas';
  url = paginate(url, page, perPage);

  url = applySorting(url, sortType, sortOrder);
  url = applyFilters(url, filters);
  return api.get(url);
};

export const fetchFeaturedArenas = (page, perPage) => {
  let url = 'arenas';
  url = paginate(url, page, perPage);
  url = `${url}&filters[]=3`;

  return api.get(url);
};

export const fetchArenasMedia = (arenaId, page, filterSortData,
  perPage = 20) => {

  let url = `arenas/${arenaId}/media_contents`;
  url = paginate(url, page, perPage);
  url = applySorting(url, filterSortData.sortType, filterSortData.sortOrder);
  url = applyFilters(url, filterSortData.filters);
  url = applyArrayFilters(url, constants.mediaFilters.pops, filterSortData.popIds);
  url = applyArrayFilters(url, constants.mediaFilters.types, filterSortData.typeIds);

  return api.get(url);
};

const getIds = (list) => {
  let ids = [];
  list.map(x => ids.push(x.id));
  return ids;
};

export const postMediaToArena = (data) => {
  let dataToSend = {
    arena_id: data.arena_id,
    media_contents_ids: getIds(data.medias),
  };

  return api.post('me/posts', dataToSend);
};
