import FieldAsynchronousAutocomplete from '@/components/FieldAsynchronousAutocomplete';
import OptionAutompleteAvatar from '@/components/OptionAutompleteAvatar';
import AppError from '@/shared/errors/AppError';
import Yup from '@/shared/global/YupDictionary';
import { RootState } from '@/store';
import { Avatar, Chip, Grid, Typography } from '@material-ui/core';
import { Field, FormikErrors, FormikTouched } from 'formik';
import { TextField } from 'formik-material-ui';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, TypeOptions } from 'react-toastify';
import { IBasicTeam, IUserRedmine } from '../../../types';
import FetchUsersRedmineService from './services/FetchUsersRedmineService';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  hours_per_point: Yup.number().required(),
  users_redmine: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().required(),
        name: Yup.string().required(),
      }),
    )
    .min(1, 'Selecione pelo menos um colaborador')
    .required(),
});

const initialValues: IBasicTeam = {
  name: '',
  hours_per_point: 0,
  users_redmine: [],
};

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
  }, [isLoadingUsersRedmine, redmineSelectedId]);

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
            label="Colaboradores"
            options={usersRedmine}
            isLoading={isLoadingUsersRedmine}
            multiple
            fetchData={fetchUsers}
            getOptionLabel={(user: IUserRedmine) => user.name}
            renderOption={(user: IUserRedmine) => (
              <OptionAutompleteAvatar
                label={user.name}
                src={`https://redmine.sysmo.com.br:1000/account/get_avatar/${user.id_user_redmine}`}
              />
            )}
            renderTags={(users: IUserRedmine[]) => {
              return users.map(user => (
                <Chip
                  key={user.id}
                  avatar={
                    <Avatar
                      src={`https://redmine.sysmo.com.br:1000/account/get_avatar/${user.id_user_redmine}`}
                    />
                  }
                  label={user.name}
                  // onDelete={() => {
                  //   setVal(val.filter(entry => entry !== option));
                  // }}
                />
              ));
            }}
            getOptionSelected={(option: IUserRedmine, value: IUserRedmine) =>
              option.id === value.id
            }
            defaultValue={initialValues.users_redmine}
            wasTouched={(touched: FormikTouched<IBasicTeam>) =>
              touched.users_redmine != undefined
            }
            errorMessage={(errors: FormikErrors<IBasicTeam>) =>
              errors.users_redmine as string
            }
            valueSelected={(values: IBasicTeam) => values.users_redmine}
          />
        </Grid>
      </Grid>
    </>
  );
}
