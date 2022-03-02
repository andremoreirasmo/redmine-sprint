import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useState } from 'react';

interface Props {
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  [x: string]: unknown;
}

export default function TextFieldPassword({
  showPassword,
  setShowPassword,
  ...rest
}: Props) {
  const [showPasswordInternal, setShowPasswordInternal] = useState(
    showPassword ?? false,
  );

  const showPasswordInField = showPassword ?? showPasswordInternal;
  const setShowPasswordInField = (value: boolean) => {
    if (setShowPassword) {
      setShowPassword(value);
    } else {
      setShowPasswordInternal(value);
    }
  };

  return (
    <Field
      component={TextField}
      type={showPasswordInField ? 'text' : 'password'}
      {...rest}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPasswordInField(!showPasswordInField)}
            >
              {showPasswordInField ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
