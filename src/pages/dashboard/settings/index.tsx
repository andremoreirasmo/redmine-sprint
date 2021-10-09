import { Paper, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { FormEvent, useEffect, useState } from 'react';
import DialogConfirmation from '../../../components/DialogConfirmation';
import api from '../../../services/api';
import { BtnImport, DivTextField, GridBtnSave } from './style';

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
  const [state, setState] = useState<State>({
    showApiToken: false,
    apiToken: '',
    apiURL: '',
    projectSelected: null,
    inputProject: '',
    errorApiURL: false,
    errorApiToken: false,
    errorProject: false,
  });

  const [openProject, setOpenProject] = useState(false);
  const [optionsProject, setOptionsProject] = useState<Project[]>([]);
  const loading = openProject && optionsProject.length === 0;
  const [openConfirmationImport, setOpenConfirmationImport] = useState(false);

  const setFieldState = (prop: keyof State, value: unknown) => {
    setState({ ...state, [prop]: value });
  };

  useEffect(() => {
    if (!loading) {
      return undefined;
    }

    api.get('localidades/paises').then(response => {
      setOptionsProject(response.data);
      // setOptionsProject(Object.keys(countries).map((key) => countries[key]) as Project[]);
    });
  }, [loading]);

  useEffect(() => {
    if (!openProject) {
      setOptionsProject([]);
    }
  }, [openProject]);

  async function HandleSubmit(event: FormEvent) {
    event.preventDefault();

    console.log(state);
    // await api.post('orphanages', data);

    // alert('Cadastro realizado com sucesso!');

    // history.push('/app');
  }

  return (
    <Container maxWidth="md">
      <form onSubmit={HandleSubmit}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <Grid item>
            <Paper>
              <Card>
                <CardContent>
                  <DivTextField fullWidth>
                    <TextField
                      id="ApiUrl"
                      label="API URL"
                      value={state.apiURL}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setState({
                          ...state,
                          apiURL: event.target.value,
                          errorApiURL: event.target.value.length === 0,
                        });
                      }}
                      onBlur={() =>
                        setFieldState('errorApiURL', state.apiURL.length === 0)
                      }
                      error={state.errorApiURL}
                    />
                  </DivTextField>
                  <DivTextField fullWidth>
                    <InputLabel htmlFor="api-token" error={state.errorApiToken}>
                      API Token
                    </InputLabel>
                    <Input
                      id="api-token"
                      type={state.showApiToken ? 'text' : 'password'}
                      value={state.apiToken}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setState({
                          ...state,
                          apiToken: event.target.value,
                          errorApiToken: event.target.value.length === 0,
                        });
                      }}
                      onBlur={() =>
                        setFieldState(
                          'errorApiToken',
                          state.apiToken.length === 0,
                        )
                      }
                      error={state.errorApiToken}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Exibir token"
                            onClick={() => {
                              setFieldState(
                                'showApiToken',
                                !state.showApiToken,
                              );
                            }}
                            onMouseDown={(
                              event: React.MouseEvent<HTMLButtonElement>,
                            ) => {
                              event.preventDefault();
                            }}
                          >
                            {state.showApiToken ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </DivTextField>
                  <DivTextField fullWidth>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-end"
                    >
                      <Grid item xs>
                        <Autocomplete
                          id="ProjectRedmine"
                          getOptionSelected={(option, value) =>
                            option.nome === value.nome
                          }
                          getOptionLabel={option => option.nome}
                          options={optionsProject}
                          loading={loading}
                          value={state.projectSelected}
                          onChange={(_, newValue: Project | null) => {
                            setState({
                              ...state,
                              projectSelected: newValue,
                              errorProject: newValue === null,
                            });
                          }}
                          onOpen={() => {
                            setOpenProject(true);
                          }}
                          onClose={() => {
                            setOpenProject(false);
                          }}
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Projeto para importar usuarios"
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <>
                                    {loading ? (
                                      <CircularProgress
                                        color="inherit"
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                  </>
                                ),
                              }}
                              error={state.errorProject}
                            />
                          )}
                        />
                      </Grid>
                      <Tooltip title="Importar" aria-label="Import">
                        <BtnImport
                          size="medium"
                          color="secondary"
                          onClick={() => setOpenConfirmationImport(true)}
                        >
                          <SendIcon fontSize="small" />
                        </BtnImport>
                      </Tooltip>
                      <DialogConfirmation
                        title="Importar usuários?"
                        description="Os usuários presentes neste projeto irão ser importados para o sistema."
                        open={openConfirmationImport}
                        onAccepted={() => {
                          console.log('Aceitou');
                          setOpenConfirmationImport(false);
                        }}
                        onRejected={() => {
                          console.log('Recusou');
                          setOpenConfirmationImport(false);
                        }}
                      />
                    </Grid>
                  </DivTextField>
                  <GridBtnSave
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      startIcon={<SaveIcon />}
                      type="submit"
                    >
                      Salvar
                    </Button>
                  </GridBtnSave>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
