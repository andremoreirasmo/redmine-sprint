import AsynchronousAutocomplete from '@/components/AsynchronousAutocomplete';
import AppError from '@/shared/errors/AppError';
import { RootState } from '@/store';
import {
  setIsLoadingRedmine,
  setRedmines,
  setRedmineSelected,
} from '@/store/redmine.store';
import { useSnackbar, VariantType } from 'notistack';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FetchRedminesService from '../redmine/list/services/FetchRedminesService';
import { Redmine } from '../redmine/types';

export function AutocompleteRedmines() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const redmines = useSelector((state: RootState) => state.redmine.redmines);
  const isLoadingRedmine = useSelector(
    (state: RootState) => state.redmine.isLoadingRedmine,
  );
  const redmineSelected = useSelector(
    (state: RootState) => state.redmine.redmineSelected,
  );

  const fetchRedmines = useCallback(async () => {
    if (isLoadingRedmine) {
      return;
    }

    dispatch(setIsLoadingRedmine(true));

    FetchRedminesService()
      .then(redmines => {
        dispatch(setRedmines(redmines));
      })
      .catch(e => {
        const error = e as AppError;

        enqueueSnackbar(error.message, {
          variant: error.type as VariantType,
        });

        dispatch(setRedmines([]));
      })
      .finally(() => {
        dispatch(setIsLoadingRedmine(false));
      });
  }, [dispatch, enqueueSnackbar, isLoadingRedmine]);

  return (
    <AsynchronousAutocomplete
      getOptionLabel={(option: Redmine) => option.name}
      getOptionSelected={(option: Redmine, value: Redmine) =>
        option.id === value.id
      }
      onChange={(_: React.ChangeEvent<HTMLInputElement>, value: Redmine) =>
        setRedmineSelected(value)
      }
      label="Seleciona um redmine"
      fetchData={fetchRedmines}
      options={redmines}
      selected={redmineSelected}
      isLoading={isLoadingRedmine}
    />
  );
}
