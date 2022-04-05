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
import { useParams } from 'react-router-dom';
import ActionButtons from './components/ActionButtons/';
import initialValue from './FormModel/initialValue';
import validationSchema from './FormModel/validationSchema';
import ActivitiesForm from './Forms/ActivitiesForm';
import BasicForm from './Forms/BasicForm/';
import CategoriesForm from './Forms/CategoriesForm';
import { DivHeaderPage, HeaderPage, PaperForm, Root } from './styles';
import { ICreateTeam } from './types';

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
  const { idTeam } = useParams<RouteParams>();
  const isEditMode = idTeam != null;
  const caption = isEditMode ? 'Editar' : 'Nova';

  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms: number | undefined) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(
    values: ICreateTeam,
    actions: { setSubmitting: (arg0: boolean) => void },
  ) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  async function _handleSubmit(
    values: ICreateTeam,
    actions: FormikHelpers<ICreateTeam>,
  ) {
    console.log('subimit');

    // const errors = await actions.validateForm();

    // console.log(errors);

    if (isLastStep) {
      _submitForm(values, actions);
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
