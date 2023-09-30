export interface Result {
  results: Movie[];
}

export interface Movie {
  backdrop_path: string;
  id: number;
  first_air_date?: Date;
  name?: string;
  original_name?: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: Date;
  title: string;
  runtime: number;
}

export interface Show extends Movie {
  genres: Genre[];
  similar: Similar;
  videos: Videos;
  credits: Credits;
}

export interface Series {
  backdrop_path: string;
  episode_run_time: any[];
  first_air_date: Date;
  genres: Genre[];
  id: number;
  last_air_date: Date;
  name: string;
  next_episode_to_air: null;
  number_of_episodes: number;
  number_of_seasons: number;
  original_name: string;
  overview: string;
  poster_path: string;
  seasons: SeasonElement[];
  status: string;
}

export interface SeriesList extends Series {
  genres: Genre[];
  similar: Similar;
  videos: Videos;
  credits: Credits;
}

export interface Season {
  air_date: Date;
  episodes: SeasonList[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
}

export interface SeasonList {
  air_date: Date;
  episode_number: number;
  id: number;
  name: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface SeasonElement {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface Similar {
  results: Movie[];
}

export interface Videos {
  results: VideosResult[];
}

export interface VideosResult {
  name: string;
  key: string;
  site: string;
  type: string;
  id: string;
}

export interface Credits {
  cast: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  job?: string;
}
