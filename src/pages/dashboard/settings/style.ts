import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',      
    },       
    button: {
      margin: theme.spacing(1),
    },
    card: {
      borderRadius: 5,
    },
    btnSave: {
      marginTop: theme.spacing(5),
    },
    btnImport: {
      margin: theme.spacing(0, 0, 0, 1),
    },
    marginTextField: {
      marginTop: theme.spacing(3),
    }
  }),
);

export default useStyles;