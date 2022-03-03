import AsynchronousAutocomplete from '@/components/AsynchronousAutocomplete';
import AppError from '@/shared/errors/AppError';
import { useFormikContext } from 'formik';
import { useSnackbar, VariantType } from 'notistack';
import { useCallback, useContext } from 'react';
import { CreateRedmineContext } from '../context/CreateRedmineContext';
import FetchProjectsRedmineService from '../services/FetchProjectsRedmineService';
import { CreateRedmineForm, initialValues, ProjectRedmine } from '../types/';

interface Props {
  refreshProjects: boolean;
  setRefreshProjects: (value: boolean) => void;
}

export default function AutocompleteProjectsRedmine({
  refreshProjects,
  setRefreshProjects,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { setFieldValue, setFieldTouched, touched, errors, values } =
    useFormikContext<CreateRedmineForm>();

  const createRedmineContext = useContext(CreateRedmineContext);
  const valueSelected =
    values.autocomplete != initialValues.autocomplete && !refreshProjects
      ? values.autocomplete
      : null;

  const fetchRedmineProjects = useCallback(async () => {
    if (
      values.url === initialValues.url ||
      values.apiKey === initialValues.apiKey
    ) {
      enqueueSnackbar('Informe os campos URL e Api Key', {
        variant: 'warning',
      });

      createRedmineContext.actions.setProjects([]);
      return;
    }

    try {
      createRedmineContext.actions.setIsLoadingProjects(true);
      const projects = await FetchProjectsRedmineService({
        url_redmine: values.url,
        api_key_redmine: values.apiKey,
      });

      setRefreshProjects(false);

      createRedmineContext.actions.setIsLoadingProjects(false);
      createRedmineContext.actions.setProjects(projects);
    } catch (e) {
      createRedmineContext.actions.setIsLoadingProjects(false);

      if (e instanceof AppError) {
        const error = e as AppError;

        enqueueSnackbar(error.message, {
          variant: error.type as VariantType,
        });

        return;
      }
    }
  }, [
    createRedmineContext.actions,
    enqueueSnackbar,
    setRefreshProjects,
    values.apiKey,
    values.url,
  ]);

  return (
    <>
      <AsynchronousAutocomplete
        name="autocomplete"
        getOptionLabel={(option: ProjectRedmine) => option.name}
        getOptionSelected={(option: ProjectRedmine, value: ProjectRedmine) =>
          option.id === value.id
        }
        onChange={(
          _: React.ChangeEvent<HTMLInputElement>,
          value: ProjectRedmine,
        ) => setFieldValue('autocomplete', value || initialValues.autocomplete)}
        onBlur={() => {
          setFieldTouched('autocomplete', true, true);
        }}
        error={Boolean(touched.autocomplete && errors.autocomplete?.name)}
        helperText={touched.autocomplete && errors.autocomplete?.name}
        label="Projeto para importar usuarios"
        fetchData={fetchRedmineProjects}
        refresh={refreshProjects}
        options={createRedmineContext.state.projects}
        selected={valueSelected}
        isLoading={createRedmineContext.state.isLoadingProjects}
      />
    </>
  );
}
