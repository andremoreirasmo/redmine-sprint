import Dashboard from "./pages/dashboard";

import { ThemeProvider } from "styled-components";
import { MuiThemeProvider, StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "./global/theme";

export default function App() {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Dashboard />
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
