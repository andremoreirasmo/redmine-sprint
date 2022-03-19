import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Routes from './routes';
import { GlobalStyle } from './shared/global/globalStyle';
import GetTheme from './shared/global/theme';
import { RootState } from './store';

export default function App() {
  const darkMode = useSelector((state: RootState) => state.app.darkMode);
  const theme = GetTheme(darkMode);

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
