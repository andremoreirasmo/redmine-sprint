import { Grid, Typography } from '@material-ui/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import FieldAsynchronousAutocomplete from '@/components/FieldAsynchronousAutocomplete';
import { useState } from 'react';
import FetchUsersRedmineService from './services/FetchUsersRedmineService';
import { useSelector } from 'react-redux';

export default function BasicForm() {
  const redmineSelectedId = useSelector(
    (state: RootState) => state.redmine.redmineSelectedId,
  );
  const [isLoadingUsersRedmine, setIsLoadingUsersRedmine] = useState(false);
  const [usersRedmine, setUsersRedmine] = useState<IUserRedmine[]>([]);

  const fetchUsers = useCallback(async () => {
    if (isLoadingUsersRedmine) {
      return;
    }

    setIsLoadingUsersRedmine(true);

    FetchUsersRedmineService(redmineSelectedId)
      .then(users => {
        setUsersRedmine(users);
      })
      .catch(e => {
        const error = e as AppError;

        toast(error.message, { type: error.type as TypeOptions });

        setUsersRedmine([]);
      })
      .finally(() => {
        setIsLoadingUsersRedmine(false);
      });
  }, [isLoadingActivities, redmineSelectedId]);

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

        <Grid item xs={12} sm={12}>
          <FieldAsynchronousAutocomplete
            name="users_redmine"
            label="Atividades"
            options={usersRedmine}
            isLoading={isLoadingUsersRedmine}
            multiple
            fetchData={fetchUsers}
            getOptionLabel={(user: IUserRedmine) => activity.name}
            getOptionSelected={(option: IUserRedmine, value: IUserRedmine) =>
              option.id === value.id
            }
            // defaultValue={initialValues.activities_redmine}
            // wasTouched={(touched: FormikTouched<IActivity>) =>
            //   touched.activities_redmine != undefined
            // }
            // errorMessage={(errors: FormikErrors<IActivity>) =>
            //   errors.activities_redmine as string
            // }
            // valueSelected={(values: IActivity) => values.activities_redmine}
          />
        </Grid>
      </Grid>
    </>
  );
}
