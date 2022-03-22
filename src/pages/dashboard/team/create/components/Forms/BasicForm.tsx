import { Grid, Typography } from '@material-ui/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

export default function BasicForm() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Dados básicos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Field component={TextField} label="Nome" name="name" fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            component={TextField}
            label="Horas por ponto"
            name="hours_per_point"
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
