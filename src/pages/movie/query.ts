import { EnvironmentHelper } from '../../helpers/environment.helper';
import axios from 'axios';
import { MovieType } from '../../types/content.types';

export const movie = async (id: string): Promise<MovieType> => {
  const { data } = await axios.get<MovieType>(
    `${EnvironmentHelper.getVariableValue('VITE_MOVIE_DB_GET_MOVIE')}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${EnvironmentHelper.getVariableValue(
          'VITE_MOVIE_DB_TOKEN',
        )}`,
      },
    },
  );

  return data;
};
