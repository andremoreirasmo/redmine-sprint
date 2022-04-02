import Yup from '@/shared/global/YupDictionary';

export default [
  Yup.object().shape({
    name: Yup.string().required(),
    hours_per_point: Yup.number().required().min(1, 'Campo obrigatório'),
    users_redmine: Yup.array()
      .min(1, 'Selecione pelo menos um colaborador')
      .required(),
  }),
  Yup.object().shape({
    activities: Yup.array()
      .min(1, 'Cadastre pelo menos uma atividade')
      .required('Cadastre pelo menos uma atividade'),
  }),
  Yup.object().shape({
    categories: Yup.array()
      .min(1, 'Cadastre pelo menos uma categoria')
      .required('Cadastre pelo menos uma atividade'),
  }),
];
