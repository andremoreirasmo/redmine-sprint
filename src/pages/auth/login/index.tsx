import googleIcon from '@/assets/google_icon.svg';
import DividerWithText from '@/components/DividerWithText';
import LoadingButton from '@/components/LoadingButton/';
import TextFieldPassword from '@/components/TextFieldPassword';
import Yup from '@/global/YupDictionary';
import api, { ErrorResponse } from '@/services/api';
import { AuthState, login } from '@/store/auth.store';
import { Button, Container, Link, Typography } from '@material-ui/core';
import { AxiosError, AxiosResponse } from 'axios';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  DivInformation,
  DivRembemerMe,
  DivSignup,
  DivTextField,
  Root,
} from './styles';

interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialValues: LoginRequest = {
  email: '',
  password: '',
  rememberMe: true,
};

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
  rememberMe: Yup.boolean(),
});

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values: LoginRequest) => {
    (await api.post)<LoginRequest, AxiosResponse<AuthState>>('sessions', values)
      .then(response => {
        dispatch(login(response.data));
        history.push('/dashboard');
      })
      .catch((e: AxiosError) => {
        const serverError = e as AxiosError<ErrorResponse>;

        switch (e.response?.status) {
          case 400:
            enqueueSnackbar(serverError.response?.data.message, {
              variant: 'warning',
            });
            break;

          case 401:
            enqueueSnackbar('Email ou senha incorretos', {
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
          <Typography variant="h5">Entrar em Redmine Sprint</Typography>
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
                  label="Email"
                  name="email"
                  type="email"
                />
                <TextFieldPassword label="Senha" name="password" />
                <DivRembemerMe>
                  <Field
                    component={CheckboxWithLabel}
                    Label={{
                      label: (
                        <Typography variant="subtitle1">Lembre-me</Typography>
                      ),
                    }}
                    name="rememberMe"
                    type="checkbox"
                  />
                  <Typography variant="subtitle2" color="primary">
                    <Link to="/auth/forgot" component={RouterLink}>
                      Esqueceu a senha?
                    </Link>
                  </Typography>
                </DivRembemerMe>
              </DivTextField>
              <LoadingButton
                label="Entrar"
                isLoading={isSubmitting}
                onClick={submitForm}
              />
            </Form>
          )}
        </Formik>
        <DivSignup>
          <Typography variant="subtitle2">Não tem uma conta?</Typography>
          <Typography variant="subtitle2" color="primary">
            <Link to="/auth/register" component={RouterLink}>
              Registre-se
            </Link>
          </Typography>
        </DivSignup>
      </Container>
    </Root>
  );
}
