import { Button, LinearProgress } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  label: string;
  isLoading: boolean;
  fullWidth?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  onClick?: () => void;
}

const defaultProps = {
  fullWidth: true,
};

const LinearProgressBordeRadius = styled(LinearProgress)`
  border-radius: 15px;
  margin-left: 5px;
  margin-right: 5px;
`;

export default function LoadingButton(props: Props) {
  props = { ...defaultProps, ...props };
  const { label, isLoading, onClick, fullWidth, ...rest } = props;

  return (
    <>
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
      {isLoading && <LinearProgressBordeRadius color="secondary" />}
    </>
  );
}
