import { useFormikContext } from 'formik';
import AsynchronousAutocomplete from '../../../../../components/AsynchronousAutocomplete';
import { CreateRedmineForm, ProjectRedmine, initialValues } from '../types';
import api, { ErrorResponse } from '../../../../../services/api';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

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

  const fetchRedmineProjects = useCallback(async () => {
    if (
      values.url === initialValues.url ||
      values.apiKey === initialValues.apiKey
    ) {
      enqueueSnackbar('Informe os campos URL e Api Key', {
        variant: 'warning',
      });
      return [];
    }

    const projects = await api
      .get('apiredmine/projects', {
        headers: {
          url_redmine: values.url,
          api_key_redmine: values.apiKey,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch<ProjectRedmine[]>((e: AxiosError) => {
        const serverError = e as AxiosError<ErrorResponse>;

        switch (e.response?.status) {
          case 400:
            enqueueSnackbar(serverError.response?.data.message, {
              variant: 'warning',
            });
            break;

          default:
            enqueueSnackbar('Erro inesperado', {
              variant: 'error',
            });
            break;
        }

        return [];
      })
      .finally(() => setRefreshProjects(false));

    return projects;
  }, [enqueueSnackbar, setRefreshProjects, values.apiKey, values.url]);

  return (
    <AsynchronousAutocomplete
      name="autocomplete"
      getOptionLabel={(option: ProjectRedmine) => option.name}
      getOptionSelected={(option: ProjectRedmine, value: ProjectRedmine) =>
        option.name === value.name
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
    />
  );
}
