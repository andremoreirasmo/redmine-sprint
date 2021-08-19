import React from 'react';
import fetch from 'cross-fetch';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import Autocomplete from '@material-ui/lab/Autocomplete';

import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      
    },       
    button: {
      margin: theme.spacing(1),
    },
    card: {
      borderRadius: 5,
    },
    btnSave: {
      marginTop: theme.spacing(5),
    },
    btnImport: {
      margin: theme.spacing(0, 0, 0, 1),
    },
    marginTextField: {
      marginTop: theme.spacing(3),
    }
  }),
);

interface Project {
  nome: string;
}

interface State {  
  showApiToken: boolean;
  apiToken: string;
  apiURL: string;
  projectSelected: Project | null;
  inputProject: string;
  errorApiURL: boolean;
  errorApiToken: boolean;  
  errorProject: boolean;
}

export default function Settings() {
  const classes = useStyles();

  const [state, setState] = React.useState<State>({
    showApiToken: false,
    apiToken: '',
    apiURL: '',
    projectSelected: null,
    inputProject: '',
    errorApiURL: false,
    errorApiToken: false,    
    errorProject: false,
  });

  const [openProject, setOpenProject] = React.useState(false);
  const [optionsProject, setOptionsProject] = React.useState<Project[]>([]);
  const loading = openProject && optionsProject.length === 0;

  const setFieldState = (prop: keyof State, value: any) => {
    setState({ ...state, [prop]: value });
  };
  
  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldState(prop, event.target.value);
  };


  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    async function fetchData() {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/paises');      
      const countries = await response.json();

      if (active) {
        setOptionsProject(Object.keys(countries).map((key) => countries[key]) as Project[]);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [loading]);
  
  React.useEffect(() => {
    if (!openProject) {
      setOptionsProject([]);
    }
  }, [openProject]);

  return (
    <Container maxWidth="md">
      <form>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <Grid item>
            <Box className={classes.card} boxShadow={3}>
              <Card>
                <CardContent>
                  <FormControl fullWidth className={classes.marginTextField}>
                    <TextField 
                      id="ApiUrl" 
                      label="API URL" 
                      value={state.apiURL} 
                      onChange={handleChange('apiURL')}
                      onBlur={() => setFieldState('errorApiURL', state.apiURL.length === 0)}
                      error = {state.errorApiURL}
                    /> 
                  </FormControl>
                  <FormControl fullWidth className={classes.marginTextField}>
                    <InputLabel htmlFor="api-token" error = {state.errorApiToken}>API Token</InputLabel>
                    <Input
                      id="api-token"
                      type={state.showApiToken ? 'text' : 'password'}
                      value={state.apiToken}
                      onChange={handleChange('apiToken')}
                      onBlur={() => setFieldState('errorApiToken', state.apiToken.length === 0)}
                      error = {state.errorApiToken}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Exibir token"
                            onClick={() => {
                              setFieldState('showApiToken', !state.showApiToken);
                            }}
                            onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                              event.preventDefault();
                            }}
                          >
                            {state.showApiToken ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth className={classes.marginTextField}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-end"
                    >
                      <Grid item xs >
                        <Autocomplete
                          id="ProjectRedmine"
                          open={openProject}
                          onOpen={() => {
                            setOpenProject(true);
                          }}
                          onClose={() => {
                            setFieldState('errorProject', state.projectSelected === null);
                            setOpenProject(false);
                          }}
                          getOptionSelected={(option, value) => option.nome === value.nome}
                          getOptionLabel={(option) => option.nome}
                          options={optionsProject}
                          loading={loading}
                          value={state.projectSelected}
                          onChange={(_, newValue: Project | null) => {
                            setFieldState('projectSelected', newValue)
                          }}                          
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Projeto para importar usuarios"
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                  </>
                                ),
                              }}                              
                              error = {state.errorProject}                              
                            />
                          )}
                        />                        
                      </Grid>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        className={classes.btnImport}
                        endIcon={<SendIcon />}
                      >
                        Importar
                      </Button>      
                      </Grid> 
                  </FormControl> 
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    className={classes.btnSave}
                  >
                            
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                    >
                      Salvar
                    </Button>    
                  </Grid>                 
                </CardContent>
              </Card> 
            </Box>
          </Grid>      
        </Grid>
      </form>
    </Container>
  );
}
