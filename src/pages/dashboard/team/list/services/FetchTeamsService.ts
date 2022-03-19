import AppError from '@/shared/errors/AppError';
import getApi, { ErrorResponse } from '@/shared/providers/api';
import { AxiosError } from 'axios';
import { Team } from '../../types/Team';

const FetchTeamsService = async (redmineId: string): Promise<Team[]> => {
  const response = await getApi()
    .get<Team[]>(`team?redmine_id=${redmineId}`)
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

  return response.data;
};

export { FetchTeamsService };
