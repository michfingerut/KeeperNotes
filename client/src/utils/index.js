import { showError } from './errorUtils';

//TODO: sort also by isDone
const sortFunc = (data) => {
  return data.sort((a, b) => {
    if (a.isFavorite === b.isFavorite) {
      return a.id - b.id;
    }
    return a.isFavorite ? -1 : 1;
  });
};

export { sortFunc, showError };
