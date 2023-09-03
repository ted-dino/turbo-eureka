import axiosEndpoint from "@/lib/axiosEndpoint";

export const getRandomMovie = async (endpoint: string) => {
  const randomMovie = await axiosEndpoint.get(endpoint, {
    params: {
      page: 1,
      include_adult: false,
      sort_by: "popularity.desc",
      query: "netflix",
    },
  });

  return randomMovie.data.results[0];
};

export const getMoviesByGenre = async (genre: string) => {
  const result = await axiosEndpoint.get("/discover/movie", {
    params: {
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      page: 1,
      sort_by: "popularity.desc",
      with_genres: genre,
    },
  });

  return result.data;
};
