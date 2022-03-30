import FetchRedmineService from '@/pages/dashboard/redmine/create/services/FetchRedmineService';
import { Redmine } from '@/pages/dashboard/redmine/types';
import AppError from '@/shared/errors/AppError';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './../../store/index';
import { toast, TypeOptions } from 'react-toastify';

const initialRedmine: Redmine = {
  id: '',
  name: '',
  url: '',
  apiKey: '',
  project_import: 0,
  redmine_users: [],
};

export default function useRedmineSelected() {
  const redmineSelectedId = useSelector(
    (state: RootState) => state.redmine.redmineSelectedId,
  );
  const [redmine, setRedmine] = useState(initialRedmine);

  if (redmineSelectedId != redmine.id) {
    FetchRedmineService(redmineSelectedId)
      .then(redmine => setRedmine(redmine))
      .catch(e => {
        const error = e as AppError;

        toast(error.message, { type: error.type as TypeOptions });
        setRedmine(initialRedmine);
      });
  }

  return useMemo<Redmine>((): Redmine => redmine, [redmine]);
}
