import Dashboard from "../pages/dashboard";
import Container from "@material-ui/core/Container";

import useStyles from "./styles";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "../global/theme";

export default function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.container}>
        <Dashboard />
      </Container>
    </ThemeProvider>
  );
}
