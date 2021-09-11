import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    button: {
      margin: theme.spacing(1),
    },
    btnSave: {
      marginTop: theme.spacing(5),
    },
    btnImport: {
      margin: theme.spacing(0, 0, 0, 1),
    },
    btnImportFab: {
      width: "auto",
      borderRadius: 8,
      height: 40,
      padding: "0 16px",
    },
    marginTextField: {
      marginTop: theme.spacing(3),
    },
  })
);

export default useStyles;
