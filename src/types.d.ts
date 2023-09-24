export interface Result {
  results: Item[];
}

export interface Item {
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

export interface Show extends Item {
  genres: Genre[];
  similar: Similar;
  videos: Videos;
  credits: Credits;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Similar {
  results: Item[];
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

export interface Season {
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: any[];
  first_air_date: Date;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: Date;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: null;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  seasons: SeasonElement[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: Date;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

export interface SeasonElement {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}
