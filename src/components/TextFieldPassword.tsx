import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

interface Props {
  label: string;
  name: string;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TextFieldPassword({
  label,
  name,
  showPassword,
  setShowPassword,
}: Props) {
  return (
    <Field
      component={TextField}
      label={label}
      name={name}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              // onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
              //   event.preventDefault()
              // }
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
