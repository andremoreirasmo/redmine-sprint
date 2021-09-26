import { useState, FormEvent } from "react";
import {
  Container,
  Typography,
  Button,
  Link,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import {
  Root,
  FormLogin,
  DivInformation,
  DivTextField,
  DivSignup,
} from "./styles";

import DividerWithText from "../../../components/DividerWithText";
import {
  TextFieldCustom,
  defaultStateTextFieldCustom,
} from "../../../components/TextFieldCustom";
import LoadingButton from "../../../components/LoadingButton";
import googleIcon from "../../../assets/google_icon.svg";

export default function Register() {
  const [stateName, setStateName] = useState(defaultStateTextFieldCustom);
  const [stateEmail, setStateEmail] = useState(defaultStateTextFieldCustom);
  const [statePassword, setStatePassword] = useState(
    defaultStateTextFieldCustom
  );
  const [statePasswordConfirmation, setStatePasswordConfirmation] = useState(
    defaultStateTextFieldCustom
  );
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (stateEmail.value.length === 0) {
      stateEmail.error = true;
      setStateEmail({
        ...stateEmail,
        error: true,
      });
    }

    if (statePassword.value.length === 0) {
      statePassword.error = true;
      setStatePassword({
        ...statePassword,
        error: true,
      });
    }

    if (stateEmail.error || statePassword.error) {
      return;
    }

    setIsLoading(true);
    console.log(stateEmail);
    console.log(statePassword);
  }

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
        <FormLogin onSubmit={handleSubmit}>
          <DivTextField>
            <TextFieldCustom
              label="Nome"
              type="text"
              state={stateName}
              setState={setStateName}
            />
            <TextFieldCustom
              label="Email"
              type="email"
              state={stateEmail}
              setState={setStateEmail}
            />
            <TextFieldCustom
              label="Senha"
              type="password"
              state={statePassword}
              setState={setStatePassword}
            />
            <TextFieldCustom
              label="Confirme sua senha"
              type="password"
              state={statePasswordConfirmation}
              setState={setStatePasswordConfirmation}
            />
          </DivTextField>
          <LoadingButton
            label="Cadastrar"
            isLoading={isLoading}
            type="submit"
          />
        </FormLogin>
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
