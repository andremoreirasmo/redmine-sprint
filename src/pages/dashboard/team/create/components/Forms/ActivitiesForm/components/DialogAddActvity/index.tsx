import FieldAsynchronousAutocomplete from '@/components/FieldAsynchronousAutocomplete';
import LoadingButton from '@/components/LoadingButton/';
import { useCreateTeamContext } from '@/pages/dashboard/team/create/context/CreateTeamContext';
import {
  IActivity,
  IApiRedmineActivity,
} from '@/pages/dashboard/team/create/types';
import AppError from '@/shared/errors/AppError';
import Yup from '@/shared/global/YupDictionary';
import { RootState } from '@/store';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core/';
import {
  Field,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikTouched,
} from 'formik';
import { TextField } from 'formik-material-ui';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, TypeOptions } from 'react-toastify';
import FetchActivitiesService from './services/FetchActivitiesService';
import { FormActivities } from './styles';

interface Props {
  open: boolean;
  indexEditActivity: number;
  handleClose: () => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required(),
  activities_redmine: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().required(),
        name: Yup.string().required(),
      }),
    )
    .min(1, 'Selecione pelo menos uma atividade')
    .required(),
});

const initialValues: IActivity = {
  name: '',
  activities_redmine: [],
};

export default function DialogAddActvity({
  open,
  handleClose,
  indexEditActivity,
}: Props) {
  const redmineSelectedId = useSelector(
    (state: RootState) => state.redmine.redmineSelectedId,
  );
  const createTeamContext = useCreateTeamContext();

  const { activities } = createTeamContext.state;
  const { addActivity, editActivity } = createTeamContext.actions;

  const [isLoadingActivities, setIsLoadingActivities] = useState(false);
  const [activitiesRedmine, setActivitiesRedmine] = useState<
    IApiRedmineActivity[]
  >([]);

  const isEditMode = indexEditActivity != -1;

  const fetchActivities = useCallback(async () => {
    if (isLoadingActivities) {
      return;
    }

    setIsLoadingActivities(true);

    FetchActivitiesService(redmineSelectedId)
      .then(activities => {
        setActivitiesRedmine(activities);
      })
      .catch(e => {
        const error = e as AppError;

        toast(error.message, { type: error.type as TypeOptions });

        setActivitiesRedmine([]);
      })
      .finally(() => {
        setIsLoadingActivities(false);
      });
  }, [isLoadingActivities, redmineSelectedId]);

  if (!open) {
    return null;
  }

  const handleSubmit = (
    values: IActivity,
    { setSubmitting }: FormikHelpers<IActivity>,
  ) => {
    const existingActivities = activities.findIndex(
      e => e.name === values.name,
    );

    if (existingActivities >= 0 && existingActivities != indexEditActivity) {
      toast.warn('Já existe uma atividade com esse nome.');
      setSubmitting(false);
      return;
    }

    const existsActivityRedmine = activities
      .filter((e, index) => index != indexEditActivity)
      .flatMap(e => e.activities_redmine)
      .find(e =>
        values.activities_redmine.find(activity => e.id === activity.id),
      );

    if (existsActivityRedmine) {
      toast.warn('Algumas das atividades do redmine já foram selecionadas.');
      setSubmitting(false);
      return;
    }
    if (indexEditActivity === -1) {
      addActivity(values);
    } else {
      editActivity(values, indexEditActivity);
    }

    handleClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {function Render({ submitForm, isSubmitting, setFieldValue }) {
        useEffect(() => {
          if (indexEditActivity >= 0) {
            const activity = activities[indexEditActivity];

            let k: keyof IActivity;
            for (k in activity) {
              setFieldValue(k, activity[k], false);
            }
          }
        }, [setFieldValue]);

        return (
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>
              {isEditMode ? 'Editar' : 'Adicionar'} atividade
            </DialogTitle>
            <DialogContent>
              <FormActivities>
                <Field
                  component={TextField}
                  label="Nome"
                  name="name"
                  fullWidth
                />
                <FieldAsynchronousAutocomplete
                  name="activities_redmine"
                  label="Atividades"
                  options={activitiesRedmine}
                  isLoading={isLoadingActivities}
                  multiple
                  fetchData={fetchActivities}
                  getOptionLabel={(activity: IApiRedmineActivity) =>
                    activity.name
                  }
                  getOptionSelected={(
                    option: IApiRedmineActivity,
                    value: IApiRedmineActivity,
                  ) => option.id === value.id}
                  defaultValue={initialValues.activities_redmine}
                  wasTouched={(touched: FormikTouched<IActivity>) =>
                    touched.activities_redmine != undefined
                  }
                  errorMessage={(errors: FormikErrors<IActivity>) =>
                    errors.activities_redmine as string
                  }
                  valueSelected={(values: IActivity) =>
                    values.activities_redmine
                  }
                />
              </FormActivities>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <LoadingButton
                label="Salvar"
                isLoading={isSubmitting}
                onClick={submitForm}
                size="medium"
                fullWidth={false}
              />
            </DialogActions>
          </Dialog>
        );
      }}
    </Formik>
  );
}
