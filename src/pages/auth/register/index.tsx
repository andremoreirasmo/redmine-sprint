import googleIcon from '@/assets/google_icon.svg';
import DividerWithText from '@/components/DividerWithText';
import LoadingButton from '@/components/LoadingButton/';
import TextFieldPassword from '@/components/TextFieldPassword';
import Yup from '@/shared/global/YupDictionary';
import getApi, { ErrorResponse } from '@/shared/providers/api';
import { Button, Container, Typography } from '@material-ui/core';
import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { DivBackLogin, DivInformation, DivTextField, Root } from './styles';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const initialValues: RegisterRequest = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(4),
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Senhas não conferem.'),
});

export default function Register() {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const api = getApi();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: RegisterRequest) => {
    await api
      .post('user', values)
      .then(() => {
        history.push('/auth/login');
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
    <Root>
      <Container maxWidth="sm">
        <DivInformation>
          <Typography variant="h5">Crie sua conta em Redmine Sprint</Typography>
          <Typography variant="body1" color="textSecondary">
            Insira suas informações a baixo
          </Typography>
          <br />
          <Button variant="outlined" size="large" fullWidth>
            <img src={googleIcon} alt="" />
          </Button>
        </DivInformation>
        <DividerWithText>OU</DividerWithText>
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
                  label="Nome"
                  name="name"
                  type="email"
                />
                <Field
                  component={TextField}
                  label="Email"
                  name="email"
                  type="email"
                />
                <TextFieldPassword
                  label="Senha"
                  name="password"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <TextFieldPassword
                  label="Confirme sua senha"
                  name="passwordConfirmation"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </DivTextField>
              <LoadingButton
                label="Cadastrar"
                isLoading={isSubmitting}
                onClick={submitForm}
              />
            </Form>
          )}
        </Formik>
        <DivBackLogin>
          <Button
            fullWidth
            color="primary"
            component={RouterLink}
            to="/auth/login"
          >
            Voltar para login
          </Button>
        </DivBackLogin>
      </Container>
    </Root>
  );
}
