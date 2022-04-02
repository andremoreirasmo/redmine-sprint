import { Button, CircularProgress } from '@material-ui/core';
import { useFormikContext } from 'formik';
import { isEmpty } from 'lodash';
import { Root } from './styles';

interface Props {
  isSubmitting: boolean;
  isLastStep: boolean;
  activeStep: number;
  handleBack: () => void;
}

export default function ActionButtons({
  handleBack,
  activeStep,
  isLastStep,
  isSubmitting,
}: Props) {
  const { handleSubmit, validateForm, setTouched, touched } =
    useFormikContext();

  const handleClickSubmit = async () => {
    const errors = await validateForm();

    if (!isEmpty(errors)) {
      setTouched({ ...touched, ...errors });
      return;
    }

    handleSubmit();
  };

  return (
    <Root>
      {activeStep !== 0 && <Button onClick={handleBack}>Voltar</Button>}
      <div>
        <Button
          disabled={isSubmitting}
          variant="contained"
          color="primary"
          onClick={handleClickSubmit}
        >
          {isLastStep ? 'Salvar equipe' : 'Próximo'}
        </Button>
        {isSubmitting && <CircularProgress size={24} />}
      </div>
    </Root>
  );
}
