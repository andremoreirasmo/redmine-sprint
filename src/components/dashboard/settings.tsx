import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
  }),
);

interface State {  
  ShowApiToken: boolean;
  ApiToken: string;  
  ApiURl: string;
}

export default function Settings() {
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    ShowApiToken: false,
    ApiToken: '',
    ApiURl: ''
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowApiToken = () => {
    setValues({ ...values, ShowApiToken: !values.ShowApiToken });
  };

  const handleMouseDownApiToken = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <div>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="ApiUrl">API URL</InputLabel>
          <Input
            id="ApiUrl"
            value={values.ApiURl}
            onChange={handleChange('ApiURl')}
          />
        </FormControl>
        <FormControl fullWidth className={clsx(classes.margin)}>
          <InputLabel htmlFor="api-token">API Token</InputLabel>
          <Input
            id="api-token"
            type={values.ShowApiToken ? 'text' : 'ApiToken'}
            value={values.ApiToken}
            onChange={handleChange('ApiToken')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle ApiToken visibility"
                  onClick={handleClickShowApiToken}
                  onMouseDown={handleMouseDownApiToken}
                >
                  {values.ShowApiToken ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>        
      </div>      
    </div>
  );
}
