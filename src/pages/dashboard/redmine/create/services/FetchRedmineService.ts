import api, { ErrorResponse } from '@/services/api';
import AppError from '@/shared/errors/AppError';
import { Redmine } from '../../types';
import { AxiosError } from 'axios';

const FetchRedmineService = async (idRedmine: string) => {
  const response = await api.get<Redmine>(`/redmine/${idRedmine}`).catch(e => {
    const serverError = e as AxiosError<ErrorResponse>;

    switch (e.response?.status) {
      case 400:
        throw new AppError(serverError.response?.data.message || '', 'warning');
        break;

      default:
        throw new AppError('Erro inesperado', 'warning');
        break;
    }
  });

  return response.data;
};

export default FetchRedmineService;
