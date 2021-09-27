import React, { useState } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { Color } from "@material-ui/lab/Alert";

interface StatePropsToast {
  open: boolean;
  message: string;
  type: Color;
}

interface PropsToast extends StatePropsToast {
  setOpen: (value: boolean) => void;
}

export const DefaultPropsToast: StatePropsToast = {
  open: false,
  message: "",
  type: "success",
};

export default function Toast(props: PropsToast) {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    props.setOpen(false);
  };

  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity={props.type}>
        {props.message}
      </MuiAlert>
    </Snackbar>
  );
}
