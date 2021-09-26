import { Button, LinearProgress } from "@material-ui/core";

interface Props {
  label: string;
  isLoading: boolean;
  onClick?: () => void;
}

export default function LoadingButton({ label, isLoading, onClick }: Props) {
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
      {isLoading && <LinearProgress color="secondary" />}
    </>
  );
}
