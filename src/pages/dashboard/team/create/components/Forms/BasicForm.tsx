import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

export default function BasicForm() {
  return (
    <>
      <Field component={TextField} label="Nome" name="name" />
      <Field
        component={TextField}
        label="Horas por ponto"
        name="hours_per_point"
      />
    </>
  );
}
