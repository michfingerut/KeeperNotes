import { showError } from './errorUtils';

const sortFunc = (data) => {
  return data.sort((a, b) => {
    if (a.isFavorite === b.isFavorite) {
      if (a.isDone === b.isDone) {
        return a.id - b.id;
      }
      return a.isDone ? 1 : -1;
    }
    return a.isFavorite ? -1 : 1;
  });
};

export { sortFunc, showError };
