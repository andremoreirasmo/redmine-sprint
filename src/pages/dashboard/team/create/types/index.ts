import Yup from '@/shared/global/YupDictionary';

interface CreateRedmine {
  name: string;
  url: string;
  apiKey: string;
}

interface ProjectRedmine {
  id: number;
  name: string;
}

interface CreateRedmineForm extends CreateRedmine {
  autocomplete: ProjectRedmine;
}

const initialValues: CreateRedmineForm = {
  name: '',
  url: '',
  apiKey: '',
  autocomplete: { id: 0, name: '' },
};

const schema = Yup.object().shape({
  name: Yup.string().required(),
  url: Yup.string().required().url(),
  apiKey: Yup.string().required(),
  autocomplete: Yup.object()
    .shape({
      id: Yup.number(),
      name: Yup.string().required(),
    })
    .nullable()
    .required(),
});

interface IApiRedmineActivity {
  id: number;
  name: string;
}

interface IApiCategoryRedmine {
  id: number;
  name: string;
  project: {
    id: number;
    name: string;
  };
}

interface IActivity {
  name: string;
  activities_redmine: IApiRedmineActivity[];
}

interface ICategory {
  name: string;
  categories_redmine: IApiCategoryRedmine[];
}

export { initialValues, schema };
export type {
  CreateRedmineForm,
  ProjectRedmine,
  IApiRedmineActivity,
  IActivity,
  IApiCategoryRedmine,
  ICategory,
};
