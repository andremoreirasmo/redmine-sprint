import { Button } from '@material-ui/core';
import { CircularProgressButton, DivButton } from './styles';

interface Props {
  label: string;
  isLoading: boolean;
  fullWidth?: boolean;
  [x: string]: unknown;
}

const defaultProps = {
  fullWidth: true,
};

export default function LoadingButton(props: Props) {
  props = { ...defaultProps, ...props };
  const { label, isLoading, fullWidth, ...rest } = props;

  return (
    <DivButton $isLoading={isLoading}>
      <Button
        {...rest}
        variant="contained"
        disabled={isLoading}
        fullWidth={fullWidth}
        color="primary"
      >
        {isLoading && <CircularProgressButton size={25} />}
        {label}
      </Button>
    </DivButton>
  );
}
