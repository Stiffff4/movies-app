import { EnvironmentHelper } from '../../helpers/environment.helper';
import axios from 'axios';
import { LoginInfo } from '../../types/login.types';

export const mutationLogin = async (): Promise<LoginInfo> => {
  const { data } = await axios.get<LoginInfo>(
    EnvironmentHelper.getVariableValue('VITE_MOVIE_DB_GUEST_ENDPOINT'),
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
