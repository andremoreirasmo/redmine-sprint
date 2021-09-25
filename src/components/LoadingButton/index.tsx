import { Button } from "@material-ui/core";
import { CircularProgressLoadingButton } from "./styles";

interface Props {
  label: string;
  isLoading: boolean;
  onClick: () => void;
}

export default function LoadingButton({ label, isLoading, onClick }: Props) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={isLoading}
      fullWidth
      color="primary"
    >
      {isLoading && <CircularProgressLoadingButton size={14} />}
      {label}
    </Button>
  );
}
