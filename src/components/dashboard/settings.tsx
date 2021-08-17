import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import fetch from 'cross-fetch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';


interface CountryType {
  nome: string;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

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
    button: {
      margin: theme.spacing(1),
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

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<CountryType[]>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/paises');
      
      await sleep(1e3); // For demo purposes.
      const countries = await response.json();

      if (active) {
        setOptions(Object.keys(countries).map((key) => countries[key]) as CountryType[]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

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
            type={values.ShowApiToken ? 'text' : 'password'}
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
        <FormControl fullWidth className={classes.margin}>
          <Autocomplete
            id="asynchronous-demo"
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            getOptionSelected={(option, value) => option.nome === value.nome}
            getOptionLabel={(option) => option.nome}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Projeto para importar usuarios"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<SendIcon />}
          >
            Importar
          </Button>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          Salvar
        </Button>
      </div>      
    </div>
  );
}
