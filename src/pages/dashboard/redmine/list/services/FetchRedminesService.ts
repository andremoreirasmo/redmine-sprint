import AppError from '@/shared/errors/AppError';
import getApi, { ErrorResponse } from '@/shared/providers/api';
import { AxiosError } from 'axios';
import { Redmine } from '../../types/';

const FetchRedminesService = async () => {
  const response = await getApi()
    .get<Redmine[]>('redmine')
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

export default FetchRedminesService;
