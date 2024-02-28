import { ReactComponentElement } from 'react';
import { Card } from 'semantic-ui-react';

export interface Genre {
  id: number;
  name: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  integer: number;
  id: string;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface Content {
  content: ReactComponentElement<typeof Card>;
}

export interface SeasonPanelType {
  key: string;
  title: string;
  content: Content;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface MoviesType {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: string;
  poster_path: string;
}

export interface TvShowsType {
  id: number;
  name: string;
  overview: string;
  release_date: string;
  vote_average: string;
  poster_path: string;
}

export interface MovieType {
  id: string;
  title: string;
  overview: string;
  budget: number;
  genres: Genre[];
  popularity: string;
  vote_average: string;
  release_date: string;
  poster_path: string;
  adult: boolean;
  original_language: string;
  runtime: number;
  status: string;
  revenue: string;
}

export interface TvShowType {
  id: string;
  name: string;
  overview: string;
  genres: Genre[];
  popularity: string;
  vote_average: string;
  first_air_date: string;
  poster_path: string;
  languages: string[];
  original_language: string;
  status: string;
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: Season[];
  in_production: boolean;
  created_by: CreatedBy[];
  episode_run_time: number[];
}

export interface MovieTypeResult {
  results: MoviesType[];
}

export interface TvShowsTypeResult {
  results: TvShowsType[];
}
