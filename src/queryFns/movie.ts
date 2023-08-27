import axiosEndpoint from "@/lib/axiosEndpoint";
import { MovieResult, Result } from "@/types";
import genres from "@/data/genres";

const TMDB_MAX_PAGE = 500;
const item = Math.floor(Math.random() * TMDB_MAX_PAGE) + 1;

export const getRandomMovie = async () => {
  const randomMovie = await axiosEndpoint.get("/movie/top_rated", {
    params: {
      page: item,
      sort_by: "popularity.desc",
      query: "netflix",
    },
  });
  const data: MovieResult = await randomMovie.data;

  return randomMovie.data.results[0];
};

export const getRandomGenre = async () => {
  const randomIndex = Math.floor(Math.random() * genres.length);
  const genre = genres[randomIndex].name;

  const randomMovieByGenre = await axiosEndpoint.get("/discover/movie", {
    params: {
      include_adult: "false",
      include_video: "false",
      page: item + randomIndex,
      sort_by: "popularity.desc",
      with_genres: genre,
    },
  });

  const data: MovieResult = await randomMovieByGenre.data;
  const movieList = { ...data, genre };

  return movieList;
};
