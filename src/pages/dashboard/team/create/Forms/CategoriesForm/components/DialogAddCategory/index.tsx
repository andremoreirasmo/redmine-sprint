import FieldAsynchronousAutocomplete from '@/components/FieldAsynchronousAutocomplete';
import LoadingButton from '@/components/LoadingButton/';
import {
  IApiCategoryRedmine,
  ICategory,
  ICreateTeam,
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
  FormControlLabel,
} from '@material-ui/core/';
import {
  Field,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikTouched,
  useFormikContext,
} from 'formik';
import { Switch, TextField } from 'formik-material-ui';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, TypeOptions } from 'react-toastify';
import FetchCategoriesService from './services/FetchCategoriesService';
import { FormActivities } from './styles';

interface Props {
  open: boolean;
  indexEditCategory: number;
  handleClose: () => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required(),
  redmine_categories: Yup.array()
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
  redmine_categories: [],
  productive: false,
};

export default function DialogAddCategory({
  open,
  handleClose,
  indexEditCategory,
}: Props) {
  const { values, setFieldValue } = useFormikContext<ICreateTeam>();
  const { categories } = values;
  const redmineSelectedId = useSelector(
    (state: RootState) => state.redmine.redmineSelectedId,
  );

  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categoriesRedmine, setCategoriesRedmine] = useState<
    IApiCategoryRedmine[]
  >([]);

  const isEditMode = indexEditCategory != -1;

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
    const existingActivities = categories.findIndex(
      e => e.name === values.name,
    );

    if (existingActivities >= 0 && existingActivities != indexEditCategory) {
      toast.warn('Já existe uma categoria com esse nome.');
      setSubmitting(false);
      return;
    }

    const existsActivityRedmine = categories
      .filter((e, index) => index != indexEditCategory)
      .flatMap(e => e.redmine_categories)
      .find(e =>
        values.redmine_categories.find(category => e.id === category.id),
      );

    if (existsActivityRedmine) {
      toast.warn('Algumas das categorias do redmine já foram selecionadas.');
      setSubmitting(false);
      return;
    }

    if (indexEditCategory === -1) {
      categories.push(values);
    } else {
      categories[indexEditCategory] = values;
    }
    setFieldValue('categories', categories, false);

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
          if (indexEditCategory >= 0) {
            const category = categories[indexEditCategory];

            let k: keyof ICategory;
            for (k in category) {
              setFieldValue(k, category[k], false);
            }
          }
        }, [setFieldValue]);

        return (
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>
              {isEditMode ? 'Editar' : 'Adicionar'} categoria
            </DialogTitle>
            <DialogContent>
              <FormActivities>
                <Field
                  component={TextField}
                  label="Nome"
                  name="name"
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Field
                      component={Switch}
                      type="checkbox"
                      name="productive"
                    />
                  }
                  label="Categoria produtiva"
                />
                <FieldAsynchronousAutocomplete
                  name="redmine_categories"
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
                  defaultValue={initialValues.redmine_categories}
                  wasTouched={(touched: FormikTouched<ICategory>) =>
                    touched.redmine_categories != undefined
                  }
                  errorMessage={(errors: FormikErrors<ICategory>) =>
                    errors.redmine_categories as string
                  }
                  valueSelected={(values: ICategory) =>
                    values.redmine_categories
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
