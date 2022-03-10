import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';

import theme from './global/theme';
import Routes from './routes';
import { GlobalStyle } from './global/globalStyle';

export default function App() {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={5}>
            <CssBaseline />
            <GlobalStyle>
              <Routes />
            </GlobalStyle>
          </SnackbarProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
