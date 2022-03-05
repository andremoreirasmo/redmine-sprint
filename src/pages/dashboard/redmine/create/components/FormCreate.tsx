import LoadingButton from '@/components/LoadingButton/';
import TextFieldPassword from '@/components/TextFieldPassword';
import AppError from '@/shared/errors/AppError';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useSnackbar, VariantType } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Redmine } from '../../types';
import { CreateRedmineContext } from '../context/CreateRedmineContext';
import CreateRedmineService from '../services/CreateRedmineService';
import UpdateRedmineService from '../services/UpdateRedmineService';
import FetchProjectsRedmineService from '../services/FetchProjectsRedmineService';
import FetchRedmineService from '../services/FetchRedmineService';
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

    try {
      if (!isEditMode) {
        await CreateRedmineService(redmine);
      } else {
        await UpdateRedmineService({ id: idRedmine, redmineProps: redmine });
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
              const redmine = await FetchRedmineService(idRedmine);
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
