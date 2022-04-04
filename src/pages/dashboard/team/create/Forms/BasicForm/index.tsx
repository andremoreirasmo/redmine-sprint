import FieldAsynchronousAutocomplete from '@/components/FieldAsynchronousAutocomplete';
import OptionAutompleteAvatar from '@/components/OptionAutompleteAvatar';
import AppError from '@/shared/errors/AppError';
import useRedmineSelected from '@/shared/hooks/useRedmineSelected';
import { Avatar, Chip, Grid, Typography } from '@material-ui/core';
import { Field, FormikErrors, FormikTouched, useFormikContext } from 'formik';
import { TextField } from 'formik-material-ui';
import { useCallback, useState } from 'react';
import { toast, TypeOptions } from 'react-toastify';
import { initialValuesBasicForm } from '../../FormModel/initialValue';
import { ICreateTeam, IUserRedmine } from '../../types';
import FetchUsersRedmineService from './services/FetchUsersRedmineService';

export default function BasicForm() {
  const redmine = useRedmineSelected();
  const [isLoadingUsersRedmine, setIsLoadingUsersRedmine] = useState(false);
  const [usersRedmine, setUsersRedmine] = useState<IUserRedmine[]>([]);
  const { setFieldValue, values } = useFormikContext<ICreateTeam>();

  const fetchUsers = useCallback(async () => {
    if (isLoadingUsersRedmine) {
      return;
    }

    setIsLoadingUsersRedmine(true);

    FetchUsersRedmineService(redmine.id)
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
  }, [isLoadingUsersRedmine, redmine.id]);

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
            type="number"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FieldAsynchronousAutocomplete
            name="users_redmine"
            label="Colaboradores"
            options={usersRedmine}
            isLoading={isLoadingUsersRedmine}
            multiple
            fetchData={fetchUsers}
            getOptionLabel={(user: IUserRedmine) => user.name}
            renderOption={(user: IUserRedmine) => (
              <OptionAutompleteAvatar
                label={user.name}
                src={`${redmine.url}/account/get_avatar/${user.id_user_redmine}`}
              />
            )}
            renderTags={(users: IUserRedmine[]) => {
              return users.map(user => (
                <Chip
                  key={user.id}
                  avatar={
                    <Avatar
                      src={`${redmine.url}/account/get_avatar/${user.id_user_redmine}`}
                    />
                  }
                  label={user.name}
                  onDelete={() => {
                    setFieldValue(
                      'users_redmine',
                      values.users_redmine.filter(
                        entry => entry.id !== user.id,
                      ),
                    );
                  }}
                />
              ));
            }}
            getOptionSelected={(option: IUserRedmine, value: IUserRedmine) =>
              option.id === value.id
            }
            defaultValue={initialValuesBasicForm.users_redmine}
            wasTouched={(touched: FormikTouched<ICreateTeam>) =>
              touched.users_redmine != undefined
            }
            errorMessage={(errors: FormikErrors<ICreateTeam>) =>
              errors.users_redmine as string
            }
            valueSelected={(values: ICreateTeam) => values.users_redmine}
          />
        </Grid>
      </Grid>
    </>
  );
}
