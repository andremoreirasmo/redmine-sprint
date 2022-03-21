import AsynchronousAutocomplete from '@/components/AsynchronousAutocomplete';
import If from '@/components/If';
import AppError from '@/shared/errors/AppError';
import useMountEffect from '@/shared/hooks/useMountEffect';
import { RootState } from '@/store';
import {
  setIsLoadingRedmine,
  setRedmines,
  setRedmineSelected,
} from '@/store/redmine.store';
import { toast, TypeOptions } from 'react-toastify';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FetchRedminesService from '../../redmine/list/services/FetchRedminesService';
import { Redmine } from '../../redmine/types';
import { Root } from './styles';

interface IProps {
  isVisible: boolean;
}

export function AutocompleteRedmines({ isVisible }: IProps) {
  const dispatch = useDispatch();
  const redmines = useSelector((state: RootState) => state.redmine.redmines);
  const isLoadingRedmine = useSelector(
    (state: RootState) => state.redmine.isLoadingRedmine,
  );
  const redmineSelectedId = useSelector(
    (state: RootState) => state.redmine.redmineSelectedId,
  );
  const redmineSelected = redmines.find(
    redmine => redmine.id === redmineSelectedId,
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

        toast(error.message, { type: error.type as TypeOptions });

        dispatch(setRedmines([]));
      })
      .finally(() => {
        dispatch(setIsLoadingRedmine(false));
      });
  }, [dispatch, isLoadingRedmine]);

  useMountEffect(() => {
    if (redmines.length === 0) {
      fetchRedmines();
    }
  });

  return (
    <If test={isVisible}>
      <Root>
        <AsynchronousAutocomplete
          getOptionLabel={(option: Redmine) => option.name}
          getOptionSelected={(option: Redmine, value: Redmine) =>
            option.id === value.id
          }
          onChange={(
            _: React.ChangeEvent<HTMLInputElement>,
            value: Redmine | null,
          ) => dispatch(setRedmineSelected(value ? value.id : null))}
          label={redmineSelected ? 'Redmine' : 'Selecione um Redmine'}
          fetchData={fetchRedmines}
          options={redmines}
          selected={redmineSelected ? redmineSelected : null}
          isLoading={isLoadingRedmine}
          refresh={true}
          fullWidth={false}
        />
      </Root>
    </If>
  );
}
