import { Container, Typography, Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import sentSvg from "../../../../assets/sent.svg";

import { Root, DivSentSvg, DivInformation, DivBack } from "./styles";

interface Props {
  email: string;
}

export default function Successfull({ email }: Props) {
  return (
    <Root>
      <Container maxWidth="sm">
        <DivSentSvg>
          <img src={sentSvg} alt="" />
        </DivSentSvg>
        <DivInformation>
          <Typography variant="h5">E-mail enviado com sucesso</Typography>
          <Typography variant="body1">
            Enviamos um e-mail para <strong>{email}</strong>
            <br />
            Por favor, verifique seu e-mail.
          </Typography>
          <Typography variant="body1"></Typography>
          <br />
        </DivInformation>
        <DivBack>
          <Button
            color="primary"
            variant="contained"
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
