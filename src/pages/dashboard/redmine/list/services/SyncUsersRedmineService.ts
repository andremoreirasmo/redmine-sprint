import AppError from '@/shared/errors/AppError';
import getApi, { ErrorResponse } from '@/shared/providers/api';
import { AxiosError } from 'axios';

const SyncUsersRedmineService = async (id: string) => {
  const response = await getApi()
    .put(`redmine/syncUsersRedmine/${id}`)
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

export default SyncUsersRedmineService;
