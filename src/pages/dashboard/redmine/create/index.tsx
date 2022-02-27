import { Breadcrumbs, Typography } from '@material-ui/core';
import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';

import LinkRouter from '../../../../components/LinkRouter';
import LoadingButton from '../../../../components/LoadingButton';
import api, { ErrorResponse } from '../../../../services/api';

import {
  Root,
  DivHeaderPage,
  HeaderPage,
  PaperForm,
  DivBtnCreate,
} from './styles';

import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import TextFieldPassword from '../../../../components/TextFieldPassword';
import { useState } from 'react';
import { AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import MuiTextField from '@material-ui/core/TextField';

import {
  CreateRedmineForm,
  ProjectRedmine,
  initialValues,
  schema,
} from './types';
import { Autocomplete } from '@material-ui/lab';

const redmines: ProjectRedmine[] = [
  { id: 1, name: 'Barcelona' },
  { id: 2, name: 'Real Madrid' },
];

export default function Index() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values: CreateRedmineForm) => {
    const { autocomplete, ...rest } = values;
    const redmine = { ...rest, project_import: autocomplete.id };

    await api
      .post('redmine', redmine)
      .then(() => {
        enqueueSnackbar('Sucesso', {
          variant: 'success',
        });
        history.push('/dashboard/redmine/list');
      })
      .catch((e: AxiosError) => {
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
      });
  };

  return (
    <Root maxWidth="lg">
      <DivHeaderPage>
        <HeaderPage>
          <Typography variant="h5">Criar um novo Redmine</Typography>
        </HeaderPage>
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter to="/dashboard" color="inherit">
            Dashboard
          </LinkRouter>
          <LinkRouter to="/dashboard/redmine/list" color="inherit">
            Redmine
          </LinkRouter>
          <Typography color="textPrimary">Novo Redmine</Typography>
        </Breadcrumbs>
      </DivHeaderPage>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({
          submitForm,
          isSubmitting,
          touched,
          errors,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form>
            <PaperForm elevation={3}>
              <Field component={TextField} label="Nome" name="name" />
              <Field component={TextField} label="URL" name="url" />
              <TextFieldPassword
                label="Api Key"
                name="apiKey"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <Field
                name="autocomplete"
                component={Autocomplete}
                options={redmines}
                getOptionLabel={(option: ProjectRedmine) => option.name}
                getOptionSelected={(
                  option: ProjectRedmine,
                  value: ProjectRedmine,
                ) => option.name === value.name}
                onChange={(
                  _: React.ChangeEvent<HTMLInputElement>,
                  value: ProjectRedmine,
                ) =>
                  setFieldValue(
                    'autocomplete',
                    value || initialValues.autocomplete,
                  )
                }
                onBlur={() => {
                  setFieldTouched('autocomplete', true, true);
                }}
                fullwidth
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <MuiTextField
                    {...params}
                    error={Boolean(
                      touched.autocomplete && errors.autocomplete?.name,
                    )}
                    helperText={
                      touched.autocomplete && errors.autocomplete?.name
                    }
                    label="Projeto para importar usuarios"
                  />
                )}
              />
              <DivBtnCreate>
                <LoadingButton
                  label="Criar Redmine"
                  isLoading={isSubmitting}
                  onClick={submitForm}
                  size="medium"
                  fullWidth={false}
                />
              </DivBtnCreate>
            </PaperForm>
          </Form>
        )}
      </Formik>
    </Root>
  );
}
