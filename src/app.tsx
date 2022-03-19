import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from 'styled-components';
import Routes from './routes';
import { GlobalStyle } from './shared/global/globalStyle';
import theme from './shared/global/theme';

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
