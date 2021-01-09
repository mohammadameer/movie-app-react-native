import { API_KEY } from '@env';

export const getMovies = ({ page = 1 } = {}) =>
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
    .then((response) => response.json())
    .catch((err) => {
      throw err;
    });

export const searchMovies = ({ search } = {}) =>
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`
  )
    .then((response) => response.json())
    .catch((err) => {
      throw err;
    });
