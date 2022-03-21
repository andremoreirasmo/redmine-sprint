import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import LinkRouter from '@/components/LinkRouter';
import FormCreate from './components/FormCreate';
import CreateRedmineProvider from './context/CreateRedmineContext';
import { DivHeaderPage, HeaderPage, Root } from './styles';
import BasicForm from './components/Forms/BasicForm';
import ActivitiesForm from './components/Forms/ActivitiesForm';
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';

interface RouteParams {
  idTeam: string;
}

const steps = ['Básico', 'Atividades'];
function _renderStepContent(step: number) {
  switch (step) {
    case 0:
      return <BasicForm />;
    case 1:
      return <ActivitiesForm />;
    default:
      return <div>Not Found</div>;
  }
}

export default function Index() {
  const { idTeam } = useParams<RouteParams>();
  const isEditMode = idTeam != null;
  const caption = isEditMode ? 'Editar' : 'Nova';

  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms: number | undefined) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void },
  ) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(
    values: any,
    actions: { setTouched?: any; setSubmitting: any },
  ) {
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
    <CreateRedmineProvider>
      <Root maxWidth="lg">
        <DivHeaderPage>
          <HeaderPage>
            <Typography variant="h5">{caption} Equipe</Typography>
          </HeaderPage>
          <Breadcrumbs aria-label="breadcrumb">
            <LinkRouter to="/dashboard" color="inherit">
              Dashboard
            </LinkRouter>
            <LinkRouter to="/dashboard/redmine/" color="inherit">
              Equipe
            </LinkRouter>
            <Typography color="textPrimary">{caption} Equipe</Typography>
          </Breadcrumbs>
        </DivHeaderPage>

        <Stepper activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Formik
          initialValues={{ id: 1 }}
          // initialValues={formInitialValues}
          // validationSchema={currentValidationSchema}
          onSubmit={_handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form
            // id={formId}
            >
              {_renderStepContent(activeStep)}

              <div>
                {activeStep !== 0 && (
                  <Button onClick={_handleBack}>Back</Button>
                )}
                <div>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {isLastStep ? 'Place order' : 'Next'}
                  </Button>
                  {isSubmitting && <CircularProgress size={24} />}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Root>
    </CreateRedmineProvider>
  );
}
