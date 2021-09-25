import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export interface StateTextFieldCustom {
  value: string;
  error: boolean;
  showValue: boolean;
}

export const defaultStateTextFieldCustom: StateTextFieldCustom = {
  value: "",
  error: false,
  showValue: false,
};

interface Props {
  label: string;
  type?: string;
  state: StateTextFieldCustom;
  setState: React.Dispatch<React.SetStateAction<StateTextFieldCustom>>;
}

export function TextFieldCustom({ label, type, state, setState }: Props) {
  return (
    <TextField
      label={label}
      value={state.value}
      type={type === "password" && state.showValue ? "text" : type}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
          ...state,
          value: event.target.value,
          error: event.target.value.length === 0,
        });
      }}
      onBlur={() => setState({ ...state, error: state.value.length === 0 })}
      error={state.error}
      helperText={state.error ? `${label} é obrigatório.` : ""}
      InputProps={{
        endAdornment:
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  setState({ ...state, showValue: !state.showValue })
                }
                onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
                  event.preventDefault()
                }
              >
                {state.showValue ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
    />
  );
}
