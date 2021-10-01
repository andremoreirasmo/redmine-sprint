import { Button, LinearProgress } from "@material-ui/core";
import styled from "styled-components";

interface Props {
  label: string;
  isLoading: boolean;
  onClick?: () => void;
}

const LinearProgressBordeRadius = styled(LinearProgress)`
  border-radius: 15px;
  margin-left: 5px;
  margin-right: 5px;
`;

export default function LoadingButton({ label, isLoading, onClick }: Props) {
  console.log(isLoading);
  return (
    <>
      <Button
        variant="contained"
        onClick={onClick}
        disabled={isLoading}
        fullWidth
        color="primary"
      >
        {label}
      </Button>
      {isLoading && <LinearProgressBordeRadius color="secondary" />}
    </>
  );
}
