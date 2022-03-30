import Yup from '@/shared/global/YupDictionary';

export default [
  Yup.object().shape({
    name: Yup.string().required(),
    hours_per_point: Yup.number().required().min(1, 'Campo obrigatório'),
    users_redmine: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.number().required(),
          name: Yup.string().required(),
        }),
      )
      .min(1, 'Selecione pelo menos um colaborador')
      .required(),
  }),
];
