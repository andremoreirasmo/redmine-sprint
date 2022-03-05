import { Button } from '@material-ui/core';
import { DivButton, LinearProgressBordeRadius } from './style';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
  label: string;
  isLoading: boolean;
  fullWidth?: boolean;
  [x: string]: unknown;
  onClick?: () => void;
}

const defaultProps = {
  fullWidth: true,
};

export default function LoadingButton(props: Props) {
  props = { ...defaultProps, ...props };
  const { label, isLoading, onClick, fullWidth, ...rest } = props;

  return (
    <DivButton>
      <Button
        {...rest}
        variant="contained"
        onClick={onClick}
        disabled={isLoading}
        fullWidth={fullWidth}
        color="primary"
      >
        {label}
      </Button>
      {isLoading && <LinearProgressBordeRadius />}
    </DivButton>
  );
}
