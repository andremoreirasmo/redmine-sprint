import AppError from '@/shared/errors/AppError';
import getApi, { ErrorResponse } from '@/shared/providers/api';
import { AxiosError } from 'axios';
import { ICreateTeam } from '../types/index';

const CreateTeamService = async (team: ICreateTeam) => {
  await getApi()
    .post('team', team)
    .catch((e: AxiosError) => {
      const serverError = e as AxiosError<ErrorResponse>;

      switch (e.response?.status) {
        case 400:
          throw new AppError(
            serverError.response?.data.message || '',
            'warning',
          );
          break;

        default:
          throw new AppError('Erro inesperado', 'warning');
          break;
      }
    });
};

export default CreateTeamService;
