import axiosEndpoint from "@/lib/axiosEndpoint";

export const getRandomMovie = async () => {
  const TMDB_MAX_PAGE = 500;
  const item = Math.floor(Math.random() * TMDB_MAX_PAGE) + 1;

  const randomMovie = await axiosEndpoint.get("/movie/top_rated", {
    params: {
      page: item,
      include_adult: false,
      sort_by: "popularity.desc",
      query: "netflix",
    },
  });

  return randomMovie.data.results[0];
};
