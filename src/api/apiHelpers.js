import * as constants from '../constants';

export const applyFilters = (url, filters) => {
  let filtersQuery = '';
  filters && filters.map(filter => {
    filtersQuery = `${filtersQuery}&filters[]=${filter}`;
  });

  return `${url}${filtersQuery}`;
};

export const applyArrayFilters = (url, filterType, filters) => {
  let filtersQuery = filters.length ? `&filters[]=${filterType.id}` : '';
  filters && filters.map(filter => {
    filtersQuery = `${filtersQuery}&${filterType.name}[]=${filter}`;
  });

  return `${url}${filtersQuery}`;
};

export const applySorting = (url, sortType, sortOrder = 0) => {
  if (!sortType && sortType !== 0) {
    return url;
  }

  return `${url}&sort=${sortType}&order=${sortOrder}`;
};

export const paginate = (url, page, perPage = constants.LANDING_ARENA_PAGE_SIZE) => {
  return `${url}?page=${page}&per_page=${perPage}`;
};

export const notesToObject = (notes, disregardedNotes) => {
  let object = { notes: {} };

  notes.map((note, index) => {
    note.is_feature = true;
    note.order = index;
    delete note.author;
    delete note.thumbnail;
    object.notes[note.id] = note;
  });

  disregardedNotes.map(note => {
    note.is_feature = false;
    delete note.order;
    delete note.author;
    delete note.thumbnail;
    object.notes[note.id] = note;
  });

  return object;
};

export const applySpecificMedia = (url, specificMedia) => {
  return specificMedia ? `${url}&media_content_id=${specificMedia}` : url;
};
