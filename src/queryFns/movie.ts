import axiosEndpoint from "@/lib/axiosEndpoint";
import { MovieResult } from "@/types";

export const getRandomMovie = async () => {
  const TMDB_MAX_PAGE = 500;
  const item = Math.floor(Math.random() * TMDB_MAX_PAGE) + 1;
  const randomMovie = await axiosEndpoint.get("/movie/popular", {
    params: {
      page: item,
      sort_by: "popularity.desc",
    },
  });
  const data: MovieResult = await randomMovie.data;

  return randomMovie.data.results[0];
};
