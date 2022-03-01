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
  Tooltip,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SyncIcon from '@material-ui/icons/Sync';

import api, { ErrorResponse } from '../../../../services/api';
import LinkRouter from '../../../../components/LinkRouter';
import NoDataSvg from '../../../../components/NoDataSvg';
import If from '../../../../components/If';

import { Root, DivHeaderPage, HeaderPage, DivNoData } from './styles';
import { Redmine } from '../types/';
import EnumRoleRedmine from '../enums/EnumRoleRedmine';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import DialogConfirmation, {
  DialogConfirmationState,
} from '../../../../components/DialogConfirmation';

export default function Index() {
  const userAuth = useAuth();
  const [redmines, setRedmines] = useState<Redmine[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const [stateDeleteRedmine, setStateDeleteRedmine] = useState<
    DialogConfirmationState<Redmine>
  >({ open: false });

  const [stateSyncRedmine, setStateSyncRedmine] = useState<
    DialogConfirmationState<Redmine>
  >({ open: false });

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (!refresh) {
      return;
    }

    setRefresh(false);

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
    const idDelete = stateDeleteRedmine.payload?.id as string;

    await api
      .delete(`redmine/${idDelete}`)
      .then(() => {
        enqueueSnackbar('Sucesso', {
          variant: 'success',
        });
        setStateDeleteRedmine({ open: false });
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

  async function SyncRedmine() {
    setStateSyncRedmine({ open: false });
    return;
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
                      <Tooltip title="Editar" aria-label="Edit">
                        <IconButton
                          color="inherit"
                          component={RouterLink}
                          to={`/dashboard/redmine/edit/${redmine.id}`}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </If>
                    <If
                      test={
                        getRoleUser(redmine) === EnumRoleRedmine.Owner ||
                        getRoleUser(redmine) === EnumRoleRedmine.Admin
                      }
                    >
                      <Tooltip title="Sincronizar usuários" aria-label="Sync">
                        <IconButton
                          color="inherit"
                          onClick={() =>
                            setStateSyncRedmine({
                              open: true,
                              payload: redmine,
                            })
                          }
                        >
                          <SyncIcon />
                        </IconButton>
                      </Tooltip>
                    </If>
                    <If test={getRoleUser(redmine) === EnumRoleRedmine.Owner}>
                      <Tooltip title="Excluir" aria-label="Delete">
                        <IconButton
                          color="inherit"
                          component="span"
                          onClick={() =>
                            setStateDeleteRedmine({
                              open: true,
                              payload: redmine,
                            })
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </If>
                    <If test={getRoleUser(redmine) != EnumRoleRedmine.Owner}>
                      <Tooltip title="Sair" aria-label="Exit">
                        <IconButton color="inherit" component="span">
                          <ExitToAppIcon />
                        </IconButton>
                      </Tooltip>
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
        open={stateDeleteRedmine.open}
        onAccepted={() => {
          DeleteRedmine();
        }}
        onRejected={() => {
          setStateDeleteRedmine({ open: false });
        }}
      />
      <DialogConfirmation
        title="Sincronizar usuários?"
        description="Será importado todos os usuários do redmine que estão presentes no projeto para a plataforma."
        open={stateSyncRedmine.open}
        onAccepted={() => {
          SyncRedmine();
        }}
        onRejected={() => {
          setStateSyncRedmine({ open: false });
        }}
      />
    </Root>
  );
}
