import AsynchronousAutocomplete from '@/components/AsynchronousAutocomplete';
import AppError from '@/shared/errors/AppError';
import { RootState } from '@/store';
import { setRedmines } from '@/store/app.store';
import { useSnackbar, VariantType } from 'notistack';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FetchRedminesService from '../redmine/list/services/FetchRedminesService';
import { Redmine } from '../redmine/types';


export default function AutocompleteRedmines() {
  const { enqueueSnackbar } = useSnackbar();
  const redmines = useSelector((state: RootState) => state.app.redmines);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const fetchRedmines = useCallback(async () => {
    FetchRedminesService()
      .then(redmines => {
        setRefresh(false);
        dispatch(setRedmines(redmines));
      })
      .catch(e => {
        const error = e as AppError;

        enqueueSnackbar(error.message, {
          variant: error.type as VariantType,
        });

        dispatch(setRedmines([]));
      });
  }, [dispatch, enqueueSnackbar]);

  return (
    <AsynchronousAutocomplete
      name="autocomplete"
      getOptionLabel={(option: Redmine) => option.name}
      getOptionSelected={(option: Redmine, value: Redmine) =>
        option.id === value.id
      }
      onChange={(_: React.ChangeEvent<HTMLInputElement>, value: Redmine) =>
        setFieldValue('autocomplete', value || initialValues.autocomplete)
      }
      label="Seleciona um redmine"
      fetchData={fetchRedmines}
      options={redmines}
      selected={valueSelected}
      isLoading={createRedmineContext.state.isLoadingProjects}
    />
  );
}
