import api, { ErrorResponse } from '@/services/api';
import AppError from '@/shared/errors/AppError';
import { AxiosError } from 'axios';

const DeleteRedminesService = async (idDelete: string) => {
  await api.delete(`redmine/${idDelete}`).catch((e: AxiosError) => {
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
};

export default DeleteRedminesService;
