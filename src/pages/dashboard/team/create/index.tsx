import LinkRouter from '@/components/LinkRouter';
import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ActivitiesForm from './Forms/ActivitiesForm';
import BasicForm from './Forms/BasicForm/';
import CategoriesForm from './Forms/CategoriesForm';
import CreateTeamProvider from './context/CreateTeamContext';
import {
  DivBtnCreate,
  DivHeaderPage,
  HeaderPage,
  PaperForm,
  Root,
} from './styles';
import validationSchema from './FormModel/validationSchema';
import initialValue from './FormModel/initialValue';

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
  const captionBtnSave = isEditMode ? 'Salvar' : 'Criar';

  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const currentInitialValue = initialValue[activeStep];
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
    <CreateTeamProvider>
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
            initialValues={currentInitialValue}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form
              // id={formId}
              >
                {_renderStepContent(activeStep)}

                <DivBtnCreate>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack}>Voltar</Button>
                  )}
                  <div>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      {isLastStep ? `${captionBtnSave} equipe` : 'Próximo'}
                    </Button>
                    {isSubmitting && <CircularProgress size={24} />}
                  </div>
                </DivBtnCreate>
              </Form>
            )}
          </Formik>
        </PaperForm>
      </Root>
    </CreateTeamProvider>
  );
}
