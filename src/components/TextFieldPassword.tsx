import { useState } from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

interface Props {
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  [x: string]: unknown;
}

export default function TextFieldPassword(props: Props) {
  const [showPasswordInternal, setShowPasswordInternal] = useState(
    props.showPassword ?? false,
  );

  const showPassword = props.showPassword ?? showPasswordInternal;
  const setShowPassword = (value: boolean) => {
    if (props.setShowPassword) {
      props.setShowPassword(value);
    } else {
      setShowPasswordInternal(value);
    }
  };

  return (
    <Field
      component={TextField}
      type={showPassword ? 'text' : 'password'}
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
