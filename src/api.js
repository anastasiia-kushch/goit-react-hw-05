import axios from 'axios';

const options = {
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmJiMzI4NjY5MDRjYzQ4MDI2OWNkY2U3ZDViYzYwMyIsInN1YiI6IjY1ZjQ4Zjg2MDQ0M2M5MDE3ZGJjNDhhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ubpXrBHwpJMKWAwLG84Kz2w9TEsa0kvljsYeqxuTvns',
    accept: 'application/json',
  },
};

const request = axios.create(options);

const TRENDING_MOVIES = '/trending/movie/day?language=en-US';


export const getTrendingMovies = async () => {
  const response = await request.get(TRENDING_MOVIES, options);
  return response.data.results;
}

export const getMovieById = async (id) => {
  const response = await request.get(`/movie/${id}`, options)
  return response.data;
}

export const getMovieCast = async (id) => {
  const response = await request.get(`/movie/${id}/credits?language=en-US`);
  return response.data;
};