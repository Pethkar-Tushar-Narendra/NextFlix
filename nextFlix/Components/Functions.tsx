import axios from "axios";

export const getMovies = () =>
  axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`
  );
export const getTrendingMovies = () =>
  axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`
  );
export const getTopRatedMovies = () =>
  axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`
  );
export const getUpcomingMovies = () =>
  axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}`
  );
export const getMoviesByTitle = (query: string) =>
  axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
  );
export const getMoviesByGenreId = (genre: string) =>
  axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genre}`
  );
export const getMoviesGenres = () =>
  axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`
  );
export const getMoviesByKeywordId = (keywordId: string) =>
  axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_keywords=${keywordId}`
  );
export const getMoviesKeywords = (keyword: string) =>
  axios.get(
    `https://api.themoviedb.org/3/search/keyword?api_key=${process.env.TMDB_API_KEY}&query=${keyword}`
  );
export const getMovieDetails = (movieId: string) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`
  );
export const getMovieReviews = (movieId: string) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.TMDB_API_KEY}`
  );
export const getSimilarMovies = (movieId: string) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.TMDB_API_KEY}`
  );
export const getRecommendedMovies = (movieId: string) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.TMDB_API_KEY}`
  );
