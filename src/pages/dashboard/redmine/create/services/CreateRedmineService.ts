import api, { ErrorResponse } from '@/services/api';
import AppError from '@/shared/errors/AppError';
import { AxiosError } from 'axios';

export interface CreateRedmineRequest {
  project_import: number;
  name: string;
  url: string;
  apiKey: string;
}

const CreateRedmineService = async (redmine: CreateRedmineRequest) => {
  await api()
    .post('redmine', redmine)
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

export default CreateRedmineService;
