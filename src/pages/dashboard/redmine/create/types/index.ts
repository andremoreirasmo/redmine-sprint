import Yup from '../../../../../global/YupDictionary';

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

export { initialValues, schema };
export type { CreateRedmineForm, ProjectRedmine };
