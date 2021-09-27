/* eslint-disable no-template-curly-in-string */
import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    required: "Campo obrigatório",
  },
  string: {
    email: "E-mail inválido",
    url: "URL inválida",
    min: "Deve ter pelo menos ${min} caracteres",
  },
});

export default Yup;
