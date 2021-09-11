import Dashboard from "./pages/dashboard";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "./global/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {console.log(theme)}
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
}
