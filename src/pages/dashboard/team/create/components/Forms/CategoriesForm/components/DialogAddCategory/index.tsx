import FieldAsynchronousAutocomplete from '@/components/FieldAsynchronousAutocomplete';
import LoadingButton from '@/components/LoadingButton/';
import { useCreateTeamContext } from '@/pages/dashboard/team/create/context/CreateTeamContext';
import {
  ICategory,
  IApiCategoryRedmine,
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
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, TypeOptions } from 'react-toastify';
import FetchCategoriesService from './services/FetchCategoriesService';
import { FormActivities } from './styles';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required(),
  categories_redmine: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().required(),
        name: Yup.string().required(),
      }),
    )
    .min(1, 'Selecione pelo menos uma categoria')
    .required(),
});

const initialValues: ICategory = {
  name: '',
  categories_redmine: [],
};

export default function DialogAddCategory({ open, handleClose }: Props) {
  const redmineSelectedId = useSelector(
    (state: RootState) => state.redmine.redmineSelectedId,
  );
  const createTeamContext = useCreateTeamContext();

  const { categories } = createTeamContext.state;
  const { addCategory } = createTeamContext.actions;

  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categoriesRedmine, setCategoriesRedmine] = useState<
    IApiCategoryRedmine[]
  >([]);

  const fetchCategories = useCallback(async () => {
    if (isLoadingCategories) {
      return;
    }

    setIsLoadingCategories(true);

    FetchCategoriesService(redmineSelectedId)
      .then(categories => {
        setCategoriesRedmine(categories);
      })
      .catch(e => {
        const error = e as AppError;

        toast(error.message, { type: error.type as TypeOptions });

        setCategoriesRedmine([]);
      })
      .finally(() => {
        setIsLoadingCategories(false);
      });
  }, [isLoadingCategories, redmineSelectedId]);

  if (!open) {
    return null;
  }

  const handleSubmit = (
    values: ICategory,
    { setSubmitting }: FormikHelpers<ICategory>,
  ) => {
    const existingActivities = categories.find(e => e.name === values.name);

    if (existingActivities) {
      toast.warn('Já existe uma categoria com esse nome.');
      setSubmitting(false);
      return;
    }

    const existsActivityRedmine = categories
      .flatMap(e => e.categories_redmine)
      .find(e =>
        values.categories_redmine.find(category => e.id === category.id),
      );

    if (existsActivityRedmine) {
      toast.warn('Algumas das categorias do redmine já foram selecionadas.');
      setSubmitting(false);
      return;
    }

    addCategory(values);
    handleClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {function Render({ submitForm, isSubmitting }) {
        return (
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Adicionar categoria</DialogTitle>
            <DialogContent>
              <FormActivities>
                <Field
                  component={TextField}
                  label="Nome"
                  name="name"
                  fullWidth
                />
                <FieldAsynchronousAutocomplete
                  name="categories_redmine"
                  label="Categorias"
                  options={categoriesRedmine}
                  isLoading={isLoadingCategories}
                  multiple
                  fetchData={fetchCategories}
                  groupBy={(category: IApiCategoryRedmine) =>
                    category.project.name
                  }
                  getOptionLabel={(category: IApiCategoryRedmine) =>
                    category.name
                  }
                  getOptionSelected={(
                    option: IApiCategoryRedmine,
                    value: IApiCategoryRedmine,
                  ) => option.id === value.id}
                  defaultValue={initialValues.categories_redmine}
                  wasTouched={(touched: FormikTouched<ICategory>) =>
                    touched.categories_redmine != undefined
                  }
                  errorMessage={(errors: FormikErrors<ICategory>) =>
                    errors.categories_redmine as string
                  }
                  valueSelected={(values: ICategory) =>
                    values.categories_redmine
                  }
                />
              </FormActivities>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <LoadingButton
                label="Adicionar"
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
