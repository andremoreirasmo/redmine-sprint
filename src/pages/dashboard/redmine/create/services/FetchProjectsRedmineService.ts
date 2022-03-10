import api, { ErrorResponse } from '@/services/api';
import AppError from '@/shared/errors/AppError';
import { AxiosError } from 'axios';
import { ProjectRedmine } from '../types';

interface Props {
  url_redmine: string;
  api_key_redmine: string;
}

const FetchProjectsRedmineService = async ({
  url_redmine,
  api_key_redmine,
}: Props) => {
  const projects = await api()
    .get<ProjectRedmine[]>('apiredmine/projects', {
      headers: {
        url_redmine,
        api_key_redmine,
      },
    })
    .then(response => {
      return response.data;
    })
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

  return projects;
};

export default FetchProjectsRedmineService;
