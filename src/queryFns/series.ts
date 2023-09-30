import axiosEndpoint from "@/lib/axiosEndpoint";
import { Season, Series } from "@/types";

export const getPopularSeries = async (endpoint: string) => {
  const randomMovie = await axiosEndpoint.get(endpoint, {
    params: {
      page: 1,
      include_adult: false,
      sort_by: "popularity.desc",
    },
  });

  return randomMovie.data.results[0];
};

export const getSeriesByGenre = async (genre: string) => {
  const result = await axiosEndpoint.get("/discover/tv", {
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

export const getSeriesById = async (id: number) => {
  const result = await axiosEndpoint.get(`/tv/${id}`, {
    params: { language: "en-US" },
  });

  const data: Series = await result.data;

  return data;
};

export const getSeasonById = async (seriesId: number, episodeId: number) => {
  const result = await axiosEndpoint.get(
    `/tv/${seriesId}/season/${episodeId}`,
    {
      params: { language: "en-US" },
    }
  );

  const data: Season = await result.data

  return data
};
