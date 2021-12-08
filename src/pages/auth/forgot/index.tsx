import { useState } from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import Yup from '../../../global/YupDictionary';
import { AxiosError } from 'axios';

import api, { ErrorResponse } from '../../../services/api';

import LoadingButton from '../../../components/LoadingButton';
import Successfull from './successfull';

import { Root, DivInformation, DivTextField, DivBack } from './styles';

import { useSnackbar } from 'notistack';

interface ForgotRequest {
  email: string;
}

const initialValues: ForgotRequest = {
  email: '',
};

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
});

interface State {
  isSubmit: boolean;
  email: string;
}

export default function Forgot() {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState<State>({ isSubmit: false, email: '' });

  const handleSubmit = async (values: ForgotRequest) => {
    await api
      .post('password/forgot', values)
      .then(() => {
        setState({
          isSubmit: true,
          email: values.email,
        });
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

  if (state.isSubmit) {
    return <Successfull email={state.email} />;
  }

  return (
    <Root>
      <Container maxWidth="sm">
        <DivInformation>
          <Typography variant="h5">Esqueceu a senha?</Typography>
          <Typography variant="body1" color="textSecondary">
            Insira o endereço de E-mail associado à sua conta e enviaremos um
            link para redefinir a sua senha.
          </Typography>
          <br />
        </DivInformation>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <DivTextField>
                <Field
                  component={TextField}
                  label="Email"
                  name="email"
                  type="email"
                />
              </DivTextField>
              <LoadingButton
                label="Resetar senha"
                isLoading={isSubmitting}
                onClick={submitForm}
              />
            </Form>
          )}
        </Formik>
        <DivBack>
          <Button
            fullWidth
            color="primary"
            component={RouterLink}
            to="/auth/login"
          >
            Voltar para login
          </Button>
        </DivBack>
      </Container>
    </Root>
  );
}
