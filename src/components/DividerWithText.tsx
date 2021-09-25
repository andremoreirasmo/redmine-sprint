import React from "react";
import { Grid, Divider as MuiDivider } from "@material-ui/core";

interface Props {
  children: JSX.Element | string;
}

const DividerWithText = (props: Props) => (
  <Grid container alignItems="center" spacing={3}>
    <Grid item xs>
      <MuiDivider />
    </Grid>
    <Grid item>{props.children}</Grid>
    <Grid item xs>
      <MuiDivider />
    </Grid>
  </Grid>
);

export default DividerWithText;
