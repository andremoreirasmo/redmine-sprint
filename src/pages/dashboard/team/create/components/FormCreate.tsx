import LoadingButton from '@/components/LoadingButton/';
import { Redmine } from '@/pages/dashboard/redmine/types';
import AppError from '@/shared/errors/AppError';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useSnackbar, VariantType } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CreateRedmineContext } from '../context/CreateRedmineContext';
import CreateRedmineService from '../services/CreateRedmineService';
import FetchProjectsRedmineService from '../services/FetchProjectsRedmineService';
import FetchRedmineService from '../services/FetchRedmineService';
import UpdateRedmineService from '../services/UpdateRedmineService';
import { DivBtnCreate, PaperForm } from '../styles';
import { CreateRedmineForm, initialValues, schema } from '../types';
import AddIcon from '@material-ui/icons/Add';

interface Props {
  idTeam: string;
  isEditMode: boolean;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function FormCreate({ isEditMode, idTeam }: Props) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const createRedmineContext = useContext(CreateRedmineContext);

  const [showPassword, setShowPassword] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(false);

  const handleSubmit = async (values: CreateRedmineForm) => {
    const { autocomplete, ...rest } = values;
    const redmine = { ...rest, project_import: autocomplete.id };

    try {
      if (!isEditMode) {
        await CreateRedmineService(redmine);
      } else {
        await UpdateRedmineService({ id: idTeam, redmineProps: redmine });
      }

      enqueueSnackbar('Sucesso', {
        variant: 'success',
      });
      history.push('/dashboard/redmine/');
    } catch (e) {
      const error = e as AppError;

      enqueueSnackbar(error.message, {
        variant: error.type as VariantType,
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {function Render({ submitForm, isSubmitting, setFieldValue }) {
        useEffect(() => {
          if (!isEditMode) {
            return;
          }

          async function fetchRedmine() {
            try {
              createRedmineContext.actions.setIsLoadingProjects(true);
              const redmine = await FetchRedmineService(idTeam);
              const projects = await FetchProjectsRedmineService({
                url_redmine: redmine.url,
                api_key_redmine: redmine.apiKey,
              });

              createRedmineContext.actions.setProjects(projects);

              let k: keyof Redmine;
              for (k in redmine) {
                setFieldValue(k, redmine[k], false);
              }

              const projectRedmine = projects.find(
                project => project.id === redmine.project_import,
              );

              if (projectRedmine) {
                setFieldValue('autocomplete', { ...projectRedmine });
              }
            } catch (e) {
              const error = e as AppError;

              enqueueSnackbar(error.message, {
                variant: error.type as VariantType,
              });
              history.push('/dashboard/redmine/');
            }
          }

          fetchRedmine();
        }, [setFieldValue]);

        return (
          <Form>
            <PaperForm elevation={3}>
              <Field component={TextField} label="Nome" name="name" />
              <Field
                component={TextField}
                label="Horas por ponto"
                name="hours_per_point"
              />
              <Tooltip title="Add">
                <IconButton aria-label="add">
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="h6" id="tableTitle">
                Atividades
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <DivBtnCreate>
                <LoadingButton
                  label={isEditMode ? 'Salvar' : 'Criar Equipe'}
                  isLoading={isSubmitting}
                  onClick={submitForm}
                  size="medium"
                  fullWidth={false}
                />
              </DivBtnCreate>
            </PaperForm>
          </Form>
        );
      }}
    </Formik>
  );
}
