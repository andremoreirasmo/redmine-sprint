import { Container, Typography, Button, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

import { Root, DivInformation, DivTextField, DivSignup } from "./styles";

import DividerWithText from "../../../components/DividerWithText";
import LoadingButton from "../../../components/LoadingButton";
import googleIcon from "../../../assets/google_icon.svg";

const initialValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const schema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  email: Yup.string().required("Campo obrigatório"),
  password: Yup.string().required("Campo obrigatório"),
  passwordConfirmation: Yup.string()
    .required("Campo obrigatório")
    .oneOf([Yup.ref("password"), null], "Senhas não conferem."),
});

export default function Register() {
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
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              alert(JSON.stringify(values, null, 2));
            }, 500);
          }}
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
                <Field
                  component={TextField}
                  label="Senha"
                  name="password"
                  type="password"
                />
                <Field
                  component={TextField}
                  label="Confirme sua senha"
                  name="passwordConfirmation"
                  type="password"
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
        <DivSignup>
          <Typography variant="subtitle2" color="primary">
            <Link to="/auth/login" component={RouterLink}>
              Voltar para login
            </Link>
          </Typography>
        </DivSignup>
      </Container>
    </Root>
  );
}
