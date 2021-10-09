import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface DialogConfirmationProps {
  open: boolean;
  title: string;
  description: string;
  onAccepted: () => void;
  onRejected: () => void;
}

export default function DialogConfirmation(props: DialogConfirmationProps) {
  if (!props.open) {
    return null;
  }

  return (
    <Dialog open={props.open} onClose={props.onRejected}>
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onRejected} color="primary">
          Não
        </Button>
        <Button onClick={props.onAccepted} color="primary" autoFocus>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}
