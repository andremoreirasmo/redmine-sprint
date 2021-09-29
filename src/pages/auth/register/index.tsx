import { Container, Typography, Button, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import Yup from "../../../global/YupDictionary";
import { AxiosError } from "axios";
import { useHistory } from "react-router-dom";

import DividerWithText from "../../../components/DividerWithText";
import LoadingButton from "../../../components/LoadingButton";
import Toast, { DefaultPropsToast } from "../../../components/Toast";
import TextFieldPassword from "../../../components/TextFieldPassword";
import googleIcon from "../../../assets/google_icon.svg";
import api from "../../../services/api";

import { Root, DivInformation, DivTextField, DivBackLogin } from "./styles";
import { useState } from "react";

interface ValuesRegister {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const initialValues: ValuesRegister = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(4),
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Senhas não conferem."),
});

export default function Register() {
  const history = useHistory();
  const [toastProps, setToastProps] = useState(DefaultPropsToast);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: ValuesRegister) => {
    api
      .post("user", values)
      .then((response) => {
        history.push("/auth/login");
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
          <Typography variant="subtitle2" color="primary">
            <Link to="/auth/login" component={RouterLink}>
              Voltar para login
            </Link>
          </Typography>
        </DivBackLogin>
      </Container>
    </Root>
  );
}
