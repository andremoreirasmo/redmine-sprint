import { useEffect, useState } from 'react';

import {
  Breadcrumbs,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import api, { ErrorResponse } from '../../../../services/api';
import LinkRouter from '../../../../components/LinkRouter';
import NoDataSvg from '../../../../components/NoDataSvg';
import If from '../../../../components/If';

import { Root, DivHeaderPage, HeaderPage, DivNoData } from './styles';
import { Redmine } from '../typesRedmine';
import EnumRoleRedmine from '../EnumRoleRedmine';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import DialogConfirmation from '../../../../components/DialogConfirmation';

interface DeleteRedmineValues {
  open: boolean;
  redmine?: Redmine;
}

export default function Index() {
  const userAuth = useAuth();
  const [redmines, setRedmines] = useState<Redmine[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [valueDeleteRedmine, setValueDeleteRedmine] =
    useState<DeleteRedmineValues>({ open: false });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    api
      .get<Redmine[]>('redmine')
      .then(response => {
        setRedmines(response.data);
      })
      .catch((e: AxiosError) => {
        const serverError = e as AxiosError<ErrorResponse>;

        switch (e.response?.status) {
          case 400:
            enqueueSnackbar(serverError.response?.data.message, {
              variant: 'warning',
            });
            break;

          default:
            enqueueSnackbar('Erro inesperado', {
              variant: 'error',
            });
            break;
        }
      });
  }, [enqueueSnackbar, refresh]);

  function getRoleUser(redmine: Redmine): number {
    const redmineUser = redmine.redmine_users.find(
      user => user.user.id === userAuth.user?.id,
    );

    return redmineUser?.role || EnumRoleRedmine.Contributor;
  }

  async function DeleteRedmine() {
    const idDelete = valueDeleteRedmine.redmine?.id || '';

    await api
      .delete(`redmine/${idDelete}`)
      .then(() => {
        enqueueSnackbar('Sucesso', {
          variant: 'success',
        });
        setValueDeleteRedmine({ open: false });
        setRefresh(true);
      })
      .catch((e: AxiosError) => {
        const serverError = e as AxiosError<ErrorResponse>;

        switch (e.response?.status) {
          case 400:
            enqueueSnackbar(serverError.response?.data.message, {
              variant: 'warning',
            });
            break;

          default:
            enqueueSnackbar('Erro inesperado', {
              variant: 'error',
            });
            break;
        }
      });
  }

  return (
    <Root maxWidth="lg">
      <DivHeaderPage>
        <HeaderPage>
          <Typography variant="h5">Redmines cadastrados</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/dashboard/redmine/create"
          >
            Novo Redmine
          </Button>
        </HeaderPage>
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter to="/dashboard" color="inherit">
            Dashboard
          </LinkRouter>
          <Typography color="textPrimary">Redmine</Typography>
        </Breadcrumbs>
      </DivHeaderPage>
      <If test={redmines.length === 0}>
        <DivNoData>
          <NoDataSvg />
        </DivNoData>
      </If>
      <If test={redmines.length > 0}>
        <TableContainer component={Paper}>
          <Table aria-label="list redmine">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Url</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {redmines.map(redmine => (
                <TableRow hover key={redmine.id}>
                  <TableCell component="th" scope="row">
                    {redmine.name}
                  </TableCell>
                  <TableCell>{redmine.url}</TableCell>
                  <TableCell align="right">
                    <If
                      test={
                        getRoleUser(redmine) === EnumRoleRedmine.Owner ||
                        getRoleUser(redmine) === EnumRoleRedmine.Admin
                      }
                    >
                      <IconButton
                        color="inherit"
                        component={RouterLink}
                        to={`/dashboard/redmine/edit/${redmine.id}`}
                      >
                        <EditIcon />
                      </IconButton>
                    </If>
                    <If test={getRoleUser(redmine) === EnumRoleRedmine.Owner}>
                      <IconButton
                        color="inherit"
                        component="span"
                        onClick={() =>
                          setValueDeleteRedmine({ open: true, redmine })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </If>
                    <If test={getRoleUser(redmine) != EnumRoleRedmine.Owner}>
                      <IconButton color="inherit" component="span">
                        <ExitToAppIcon />
                      </IconButton>
                    </If>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </If>
      <DialogConfirmation
        title="Excluir redmine?"
        description="Todas as informações vinculadas a esse redmine serão excluidas permanentemente."
        open={valueDeleteRedmine.open}
        onAccepted={() => {
          DeleteRedmine();
        }}
        onRejected={() => {
          setValueDeleteRedmine({ open: false });
        }}
      />
    </Root>
  );
}
