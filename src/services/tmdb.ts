import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

export const getNowPlaying = () => api.get("/movie/now_playing");

export const getTopRated = () => api.get("/movie/top_rated");

export const searchMovies = (query: string) =>
  api.get(`/search/movie?query=${query}`);

export const getMovieDetails = (id: number) => api.get(`/movie/${id}`);

export const getMovieRecommendations = (id: number) =>
  api.get(`/movie/${id}/recommendations`);

export default api;
