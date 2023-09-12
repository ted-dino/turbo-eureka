export interface Result {
  page: number;
  results: Item[];
  total_pages: number;
  total_results: number;
}

export interface Item {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  first_air_date?: Date;
  name?: string;
  origin_country?: OriginCountry[];
  original_name?: string;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export enum OriginCountry {
  CA = "CA",
  Jp = "JP",
  Kr = "KR",
  Us = "US",
}

export enum OriginalLanguage {
  En = "en",
  Fr = "fr",
  Ja = "ja",
  Uk = "uk",
}

export interface Season {
  adult: boolean;
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
