import AppError from '@/shared/errors/AppError';
import getApi, { ErrorResponse } from '@/shared/providers/api';
import { AxiosError } from 'axios';
import { CreateRedmineRequest } from './CreateRedmineService';

interface Props {
  id: string;
  redmineProps: CreateRedmineRequest;
}

const UpdateRedmineService = async ({ id, redmineProps }: Props) => {
  const { project_import, name, url, apiKey } = redmineProps;
  const redmine = { project_import, name, url, apiKey };

  await getApi()
    .put(`redmine/${id}`, redmine)
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

export default UpdateRedmineService;
