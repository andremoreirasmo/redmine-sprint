import { Button } from "@material-ui/core";
import { CircularProgressLoadingButton } from "./styles";

interface Props {
  label: string;
  isLoading: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
}

export default function LoadingButton({
  label,
  isLoading,
  type,
  onClick,
}: Props) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={isLoading}
      fullWidth
      color="primary"
      type={type}
    >
      {isLoading && <CircularProgressLoadingButton size={14} />}
      {label}
    </Button>
  );
}
