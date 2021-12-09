import { Breadcrumbs, Typography } from '@material-ui/core';
import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';

import LinkRouter from '../../../../components/LinkRouter';
import LoadingButton from '../../../../components/LoadingButton';
import Yup from '../../../../global/YupDictionary';
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

interface CreateRedmineRequest {
  name: string;
  url: string;
  apiKey: string;
}

const initialValues: CreateRedmineRequest = {
  name: '',
  url: '',
  apiKey: '',
};

const schema = Yup.object().shape({
  name: Yup.string().required(),
  url: Yup.string().required().url(),
  apiKey: Yup.string().required(),
});

export default function Index() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values: CreateRedmineRequest) => {
    await api
      .post('redmine', values)
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
        {({ submitForm, isSubmitting }) => (
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
