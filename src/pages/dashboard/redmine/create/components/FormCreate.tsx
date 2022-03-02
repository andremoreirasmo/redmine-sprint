import LoadingButton from '@/components/LoadingButton';
import TextFieldPassword from '@/components/TextFieldPassword';
import api, { ErrorResponse } from '@/services/api';
import AppError from '@/shared/errors/AppError';
import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useSnackbar, VariantType } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Redmine } from '../../types';
import { CreateRedmineContext } from '../context/CreateRedmineContext';
import FetchProjectsRedmine from '../services/FetchProjectsRedmine';
import { DivBtnCreate, PaperForm } from '../styles';
import { CreateRedmineForm, initialValues, schema } from '../types';
import AutocompleteProjectsRedmine from './AutocompleteProjectsRedmine';

interface Props {
  idRedmine: string;
  isEditMode: boolean;
}

export default function FormCreate({ isEditMode, idRedmine }: Props) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const createRedmineContext = useContext(CreateRedmineContext);

  const [showPassword, setShowPassword] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(false);

  const handleSubmit = async (values: CreateRedmineForm) => {
    const { autocomplete, ...rest } = values;
    const redmine = { ...rest, project_import: autocomplete.id };

    await api
      .post('redmine', redmine)
      .then(() => {
        enqueueSnackbar('Sucesso', {
          variant: 'success',
        });
        history.push('/dashboard/redmine/');
      })
      .catch((e: AxiosError) => {
        const serverError = e as AxiosError<ErrorResponse>;

        switch (e.response?.status) {
          case 400:
            enqueueSnackbar(serverError.response?.data.message, {
              variant: 'warning',
            });
            break;

          default:
            enqueueSnackbar('Erro inesperado', {
              variant: 'error',
            });
            break;
        }
      });
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

          api
            .get<Redmine>(`/redmine/${idRedmine}`)
            .then(async response => {
              const redmine = response.data;

              let k: keyof Redmine;
              for (k in redmine) {
                setFieldValue(k, redmine[k], false);
              }

              createRedmineContext.actions.setIsLoadingProjects(true);
              const projects = await FetchProjectsRedmine({
                url_redmine: redmine.url,
                api_key_redmine: redmine.apiKey,
              });

              createRedmineContext.actions.setProjects(projects);

              const projectRedmine = projects.find(
                project => project.id === response.data.project_import,
              );

              if (projectRedmine) {
                setFieldValue('autocomplete', { ...projectRedmine });
              }
            })
            .catch(e => {
              if (e instanceof AppError) {
                const error = e as AppError;

                enqueueSnackbar(error.message, {
                  variant: error.type as VariantType,
                });

                return;
              }

              const serverError = e as AxiosError<ErrorResponse>;

              switch (e.response?.status) {
                case 400:
                  enqueueSnackbar(serverError.response?.data.message, {
                    variant: 'warning',
                  });
                  break;

                default:
                  enqueueSnackbar('Erro inesperado', {
                    variant: 'error',
                  });
                  break;
              }

              history.push('/dashboard/redmine/');
            });
        }, [setFieldValue]);

        return (
          <Form>
            <PaperForm elevation={3}>
              <Field component={TextField} label="Nome" name="name" />
              <Field
                component={TextField}
                label="URL"
                name="url"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('url', event.target.value);
                  setRefreshProjects(true);
                }}
              />
              <TextFieldPassword
                label="Api Key"
                name="apiKey"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('apiKey', event.target.value);
                  setRefreshProjects(true);
                }}
              />
              <AutocompleteProjectsRedmine
                refreshProjects={refreshProjects}
                setRefreshProjects={setRefreshProjects}
              />
              <DivBtnCreate>
                <LoadingButton
                  label={isEditMode ? 'Salvar' : 'Criar Redmine'}
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
