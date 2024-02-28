import { EnvironmentHelper } from '../../helpers/environment.helper';
import axios from 'axios';
import {
  MovieTypeResult,
  TvShowsTypeResult,
  MoviesType,
  TvShowsType,
} from '../../types/content.types';

export const movies = async (): Promise<MoviesType[]> => {
  const { data } = await axios.get<MovieTypeResult>(
    EnvironmentHelper.getVariableValue('VITE_MOVIE_DB_GET_MOVIES'),
    {
      headers: {
        Authorization: `Bearer ${EnvironmentHelper.getVariableValue(
          'VITE_MOVIE_DB_TOKEN',
        )}`,
      },
    },
  );

  return data.results;
};

export const tvshows = async (): Promise<TvShowsType[]> => {
  const { data } = await axios.get<TvShowsTypeResult>(
    EnvironmentHelper.getVariableValue('VITE_MOVIE_DB_GET_TVSHOWS'),
    {
      headers: {
        Authorization: `Bearer ${EnvironmentHelper.getVariableValue(
          'VITE_MOVIE_DB_TOKEN',
        )}`,
      },
    },
  );

  return data.results;
};
