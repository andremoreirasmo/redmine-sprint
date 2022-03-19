import AsynchronousAutocomplete from '@/components/AsynchronousAutocomplete';
import If from '@/components/If';
import AppError from '@/shared/errors/AppError';
import { RootState } from '@/store';
import {
  setIsLoadingRedmine,
  setRedmines,
  setRedmineSelected,
} from '@/store/redmine.store';
import { useSnackbar, VariantType } from 'notistack';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FetchRedminesService from '../../redmine/list/services/FetchRedminesService';
import { Redmine } from '../../redmine/types';
import { Root } from './styles';

interface IProps {
  isVisible: boolean;
}

export function AutocompleteRedmines({ isVisible }: IProps) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const redmines = useSelector((state: RootState) => state.redmine.redmines);
  const isLoadingRedmine = useSelector(
    (state: RootState) => state.redmine.isLoadingRedmine,
  );
  const redmineSelected = useSelector(
    (state: RootState) => state.redmine.redmineSelected,
  );

  useEffect(() => {
    const refreshSelectedRedmine = () => {
      if (!redmineSelected) {
        return;
      }

      const newSelectedRedmine = redmines.find(
        redmine => redmine.id === redmineSelected.id,
      );

      if (
        newSelectedRedmine &&
        newSelectedRedmine.name != redmineSelected.name
      ) {
        dispatch(setRedmineSelected(newSelectedRedmine));
      }
    };

    refreshSelectedRedmine();
  }, [dispatch, redmineSelected, redmines]);

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
    <If test={isVisible}>
      <Root>
        <AsynchronousAutocomplete
          getOptionLabel={(option: Redmine) => option.name}
          getOptionSelected={(option: Redmine, value: Redmine) =>
            option.id === value.id
          }
          onChange={(_: React.ChangeEvent<HTMLInputElement>, value: Redmine) =>
            dispatch(setRedmineSelected(value))
          }
          label={redmineSelected ? 'Redmine' : 'Selecione um Redmine'}
          fetchData={fetchRedmines}
          options={redmines}
          selected={redmineSelected}
          isLoading={isLoadingRedmine}
          refresh={true}
          fullWidth={false}
        />
      </Root>
    </If>
  );
}
