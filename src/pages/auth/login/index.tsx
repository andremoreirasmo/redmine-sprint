import { useState } from "react";
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

export default function Login() {
  const [stateEmail, setStateEmail] = useState(defaultStateTextFieldCustom);
  const [statePassword, setStatePassword] = useState(
    defaultStateTextFieldCustom
  );
  const [rememberPassword, setRememberPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
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
        <FormLogin onSubmit={handleSubmit}>
          <DivTextField>
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
            <Typography variant="subtitle2" color="primary">
              <Link to="/auth/forgot" component={RouterLink}>
                Esqueci minha senha
              </Link>
            </Typography>
          </DivTextField>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberPassword}
                onChange={(event) => setRememberPassword(event.target.checked)}
                name="rememberPassword"
                color="primary"
              />
            }
            label="Lembrar minha senha"
          />
          <LoadingButton
            label="Entrar"
            isLoading={isLoading}
            onClick={handleSubmit}
          />
          <DivSignup>
            <Typography variant="subtitle2">Não tem uma conta?</Typography>
            <Typography variant="subtitle2" color="primary">
              <Link to="/auth/register" component={RouterLink}>
                Registre-se
              </Link>
            </Typography>
          </DivSignup>
        </FormLogin>
      </Container>
    </Root>
  );
}
