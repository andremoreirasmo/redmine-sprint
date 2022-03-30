import AppError from '@/shared/errors/AppError';
import { ErrorResponse } from '@/shared/providers/api';
import { AxiosError } from 'axios';
import { IApiRedmineActivity } from '@/pages/dashboard/team/create/types';
import getApi from '@/shared/providers/api';

const FetchActivitiesService = async (redmine_id: string) => {
  const response = await getApi()
    .get<IApiRedmineActivity[]>(
      `apiredmine/activities?redmine_id=${redmine_id}`,
    )
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

export default FetchActivitiesService;
