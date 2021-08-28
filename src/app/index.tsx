import Dashboard from "../pages/dashboard";
import Container from "@material-ui/core/Container";

import useStyles from "./styles";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "../global/theme";

export default function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      {console.log(theme)}
      <CssBaseline />
      <Container className={classes.container}>
        <Dashboard />
      </Container>
    </ThemeProvider>
  );
}
