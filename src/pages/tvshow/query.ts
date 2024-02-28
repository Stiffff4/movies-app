import { EnvironmentHelper } from '../../helpers/environment.helper';
import axios from 'axios';
import { TvShowType } from '../../types/content.types';

export const tvshow = async (id: string): Promise<TvShowType> => {
  const { data } = await axios.get<TvShowType>(
    `${EnvironmentHelper.getVariableValue('VITE_MOVIE_DB_GET_TVSHOW')}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${EnvironmentHelper.getVariableValue(
          'VITE_MOVIE_DB_TOKEN',
        )}`,
      },
    },
  );
  console.log(data);
  return data;
};
