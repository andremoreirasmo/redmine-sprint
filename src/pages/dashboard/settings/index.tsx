import React, { FormEvent, useState, useEffect } from "react";
import api from "../../../services/api";

import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import Autocomplete from "@material-ui/lab/Autocomplete";

import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import useStyles from "./style";
import { Fab, Paper, Tooltip } from "@material-ui/core";

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

  const [state, setState] = useState<State>({
    showApiToken: false,
    apiToken: "",
    apiURL: "",
    projectSelected: null,
    inputProject: "",
    errorApiURL: false,
    errorApiToken: false,
    errorProject: false,
  });

  const [openProject, setOpenProject] = useState(false);
  const [optionsProject, setOptionsProject] = useState<Project[]>([]);
  const loading = openProject && optionsProject.length === 0;

  const setFieldState = (prop: keyof State, value: any) => {
    setState({ ...state, [prop]: value });
  };

  useEffect(() => {
    if (!loading) {
      return undefined;
    }

    api.get("localidades/paises").then((response) => {
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
                  <FormControl fullWidth className={classes.marginTextField}>
                    <TextField
                      id="ApiUrl"
                      label="API URL"
                      value={state.apiURL}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setState({
                          ...state,
                          apiURL: event.target.value,
                          errorApiURL: event.target.value.length === 0,
                        });
                      }}
                      onBlur={() =>
                        setFieldState("errorApiURL", state.apiURL.length === 0)
                      }
                      error={state.errorApiURL}
                    />
                  </FormControl>
                  <FormControl fullWidth className={classes.marginTextField}>
                    <InputLabel htmlFor="api-token" error={state.errorApiToken}>
                      API Token
                    </InputLabel>
                    <Input
                      id="api-token"
                      type={state.showApiToken ? "text" : "password"}
                      value={state.apiToken}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setState({
                          ...state,
                          apiToken: event.target.value,
                          errorApiToken: event.target.value.length === 0,
                        });
                      }}
                      onBlur={() =>
                        setFieldState(
                          "errorApiToken",
                          state.apiToken.length === 0
                        )
                      }
                      error={state.errorApiToken}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Exibir token"
                            onClick={() => {
                              setFieldState(
                                "showApiToken",
                                !state.showApiToken
                              );
                            }}
                            onMouseDown={(
                              event: React.MouseEvent<HTMLButtonElement>
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
                  </FormControl>
                  <FormControl fullWidth className={classes.marginTextField}>
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
                          getOptionLabel={(option) => option.nome}
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
                          renderInput={(params) => (
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

                      <Tooltip title="Importar" aria-label="Impor" className={classes.btnImport}>
                        <Fab className={classes.btnImportFab} size="medium" color="secondary" >
                          <SendIcon fontSize="small"/>
                        </Fab>
                      </Tooltip>                                            
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
                      type="submit"
                    >
                      Salvar
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
