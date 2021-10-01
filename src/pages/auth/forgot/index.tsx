import { useState } from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import Yup from "../../../global/YupDictionary";
import { AxiosError } from "axios";

import api from "../../../services/api";

import LoadingButton from "../../../components/LoadingButton";
import Toast, { DefaultPropsToast } from "../../../components/Toast";
import Successfull from "./successfull";

import { Root, DivInformation, DivTextField, DivBack } from "./styles";

interface ForgotRequest {
  email: string;
}

const initialValues: ForgotRequest = {
  email: "",
};

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
});

export default function Forgot() {
  const [toastProps, setToastProps] = useState(DefaultPropsToast);
  const [isSubmit, setIsSubmit] = useState(false);
  const [emailSubmit, setEmailSubmit] = useState("");

  const handleSubmit = async (values: ForgotRequest) => {
    await api
      .post("password/forgot", values)
      .then((response) => {
        setEmailSubmit(values.email);
        setIsSubmit(true);
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

  if (isSubmit) {
    return <Successfull email={emailSubmit} />;
  }

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
