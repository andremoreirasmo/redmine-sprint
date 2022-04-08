import LinkRouter from '@/components/LinkRouter';
import {
  Breadcrumbs,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ActionButtons from './components/ActionButtons/';
import initialValue from './FormModel/initialValue';
import validationSchema from './FormModel/validationSchema';
import ActivitiesForm from './Forms/ActivitiesForm';
import BasicForm from './Forms/BasicForm/';
import CategoriesForm from './Forms/CategoriesForm';
import { DivHeaderPage, HeaderPage, PaperForm, Root } from './styles';
import { ICreateTeam } from './types';
import CreateTeamService from './services/CreateTeamService';
import { toast, TypeOptions } from 'react-toastify';
import AppError from '@/shared/errors/AppError';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface RouteParams {
  idTeam: string;
}

const steps = ['Básico', 'Atividades', 'Categorias'];
function _renderStepContent(step: number) {
  switch (step) {
    case 0:
      return <BasicForm />;
    case 1:
      return <ActivitiesForm />;
    case 2:
      return <CategoriesForm />;
    default:
      return <div>Not Found</div>;
  }
}

export default function Index() {
  const history = useHistory();
  const { idTeam } = useParams<RouteParams>();
  const redmineSelectedId = useSelector(
    (state: RootState) => state.redmine.redmineSelectedId,
  );
  const isEditMode = idTeam != null;
  const caption = isEditMode ? 'Editar' : 'Nova';

  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  async function _submitForm(values: ICreateTeam) {
    try {
      values.redmine_id = redmineSelectedId;
      // if (!isEditMode) {
      await CreateTeamService(values);
      // } else {
      //   await UpdateRedmineService({ id: idRedmine, redmineProps: redmine });
      // }

      toast.success('Sucesso');
      history.push('/dashboard/team/');
    } catch (e) {
      const error = e as AppError;

      toast(error.message, { type: error.type as TypeOptions });
    }
  }

  async function _handleSubmit(
    values: ICreateTeam,
    actions: FormikHelpers<ICreateTeam>,
  ) {
    if (isLastStep) {
      _submitForm(values);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <Root maxWidth="lg">
      <DivHeaderPage>
        <HeaderPage>
          <Typography variant="h5">{caption} Equipe</Typography>
        </HeaderPage>
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter to="/dashboard" color="inherit">
            Dashboard
          </LinkRouter>
          <LinkRouter to="/dashboard/team/" color="inherit">
            Equipe
          </LinkRouter>
          <Typography color="textPrimary">{caption} Equipe</Typography>
        </Breadcrumbs>
      </DivHeaderPage>
      <PaperForm>
        <Stepper activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Formik
          initialValues={initialValue}
          validationSchema={currentValidationSchema}
          onSubmit={_handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {_renderStepContent(activeStep)}

              <ActionButtons
                activeStep={activeStep}
                handleBack={_handleBack}
                isLastStep={isLastStep}
                isSubmitting={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </PaperForm>
    </Root>
  );
}
