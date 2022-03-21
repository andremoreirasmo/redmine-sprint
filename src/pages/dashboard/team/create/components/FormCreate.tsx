import LoadingButton from '@/components/LoadingButton/';
import AppError from '@/shared/errors/AppError';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useSnackbar, VariantType } from 'notistack';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CreateRedmineContext } from '../context/CreateRedmineContext';
import CreateRedmineService from '../services/CreateRedmineService';
import UpdateRedmineService from '../services/UpdateRedmineService';
import { DivBtnCreate, PaperForm } from '../styles';
import { CreateRedmineForm, initialValues, schema } from '../types';
import Activies from './Activities';

interface Props {
  idTeam: string;
  isEditMode: boolean;
}

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
        return (
          <Form>
            <PaperForm elevation={3}>
              <Field component={TextField} label="Nome" name="name" />
              <Field
                component={TextField}
                label="Horas por ponto"
                name="hours_per_point"
              />
              <Activies />
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
