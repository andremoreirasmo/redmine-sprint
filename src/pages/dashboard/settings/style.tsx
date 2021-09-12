import styled from "styled-components";

import FormControl from "@material-ui/core/FormControl";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";

export const DivTextField = styled(FormControl)`
  margin-top: ${(props) => props.theme.spacing(3)}px;
`;

export const BtnImport = styled(Fab)`
  margin: ${(props) => props.theme.spacing(0, 0, 0, 1)};
  width: auto;
  border-radius: 8px;
  height: 40px;
  padding: 0 16px;
`;

export const GridBtnSave = styled(Grid)`
  margin-top: ${(props) => props.theme.spacing(5)}px;
`;
