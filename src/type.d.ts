import { Theme as MaterialUITheme } from '@material-ui/core';
import 'styled-components';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends MaterialUITheme {}
}
