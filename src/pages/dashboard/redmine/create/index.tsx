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
import { useHistory, useParams } from 'react-router-dom';
import TextFieldPassword from '../../../../components/TextFieldPassword';
import { useState } from 'react';
import AutocompleteProjectsRedmine from './components/AutocompleteProjectsRedmine';

import { CreateRedmineForm, initialValues, schema } from './types';

interface RouteParams {
  id: string;
}

export default function Index() {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const caption = id ? 'Editar' : 'Novo';

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
          <Typography variant="h5">{caption} Redmine</Typography>
        </HeaderPage>
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter to="/dashboard" color="inherit">
            Dashboard
          </LinkRouter>
          <LinkRouter to="/dashboard/redmine/list" color="inherit">
            Redmine
          </LinkRouter>
          <Typography color="textPrimary">{caption} Redmine</Typography>
        </Breadcrumbs>
      </DivHeaderPage>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ submitForm, isSubmitting, setFieldValue }) => (
          <Form>
            <PaperForm elevation={3}>
              <Field component={TextField} label="Nome" name="name" />
              <Field
                component={TextField}
                label="URL"
                name="url"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('url', event.target.value);
                  setRefreshProjects(true);
                }}
              />
              <TextFieldPassword
                label="Api Key"
                name="apiKey"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('apiKey', event.target.value);
                  setRefreshProjects(true);
                }}
              />
              <AutocompleteProjectsRedmine
                refreshProjects={refreshProjects}
                setRefreshProjects={setRefreshProjects}
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
