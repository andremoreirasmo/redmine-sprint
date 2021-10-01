import { useState } from "react";
import { Container, Typography, Button, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import Yup from "../../../global/YupDictionary";
import { AxiosError } from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import DividerWithText from "../../../components/DividerWithText";
import LoadingButton from "../../../components/LoadingButton";
import Toast, { DefaultPropsToast } from "../../../components/Toast";
import TextFieldPassword from "../../../components/TextFieldPassword";
import googleIcon from "../../../assets/google_icon.svg";
import api from "../../../services/api";

import { Root, DivInformation, DivTextField, DivSignup } from "./styles";

import { login } from "../../../store/auth.store";

interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialValues: LoginRequest = {
  email: "",
  password: "",
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
  const [toastProps, setToastProps] = useState(DefaultPropsToast);

  const handleSubmit = async (values: LoginRequest) => {
    api
      .post("sessions", values)
      .then((response) => {
        dispatch(login(response.data));
        history.push("/dashboard");
      })
      .catch((e: AxiosError) => {
        switch (e.response?.status) {
          case 400:
            setToastProps({
              type: "error",
              open: true,
              message: e.response.data.message,
            });
            break;

          case 401:
            setToastProps({
              type: "error",
              open: true,
              message: "Email ou senha incorretos",
            });
            break;

          default:
            setToastProps({
              type: "error",
              open: true,
              message: "Erro inesperado",
            });
            break;
        }
      });
  };

  return (
    <Root>
      <Toast
        open={toastProps.open}
        message={toastProps.message}
        type={toastProps.type}
        setOpen={(open) => setToastProps({ ...toastProps, open })}
      />
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
