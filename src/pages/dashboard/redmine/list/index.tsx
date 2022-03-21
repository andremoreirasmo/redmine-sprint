import DialogConfirmation, {
  DialogConfirmationState,
} from '@/components/DialogConfirmation';
import If from '@/components/If';
import LinkRouter from '@/components/LinkRouter';
import NoDataSvg from '@/components/NoDataSvg';
import AppError from '@/shared/errors/AppError';
import { RootState } from '@/store';
import { setIsLoadingProcess } from '@/store/app.store';
import { setIsLoadingRedmine, setRedmines } from '@/store/redmine.store';
import {
  Breadcrumbs,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SyncIcon from '@material-ui/icons/Sync';
import { toast, TypeOptions } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import EnumRoleRedmine from '../enums/EnumRoleRedmine';
import { Redmine } from '../types/';
import DeleteRedminesService from './services/DeleteRedminesService';
import FetchRedminesService from './services/FetchRedminesService';
import SyncUsersRedmineService from './services/SyncUsersRedmineService';
import {
  DivCircularProgress,
  DivHeaderPage,
  DivNoData,
  HeaderPage,
  Root,
} from './styles';

export default function Index() {
  const userAuth = useSelector((state: RootState) => state.auth);
  const redmines = useSelector((state: RootState) => state.redmine.redmines);
  const isLoadingRedmine = useSelector(
    (state: RootState) => state.redmine.isLoadingRedmine,
  );
  const dispatch = useDispatch();

  const [stateDeleteRedmine, setStateDeleteRedmine] = useState<
    DialogConfirmationState<Redmine>
  >({ open: false });

  const [stateSyncRedmine, setStateSyncRedmine] = useState<
    DialogConfirmationState<Redmine>
  >({ open: false });

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (!refresh || isLoadingRedmine) {
      return;
    }

    dispatch(setIsLoadingRedmine(true));

    FetchRedminesService()
      .then(redmines => {
        setRefresh(false);
        dispatch(setRedmines(redmines));
      })
      .catch(e => {
        const error = e as AppError;

        toast(error.message, { type: error.type as TypeOptions });

        dispatch(setRedmines([]));
      })
      .finally(() => dispatch(setIsLoadingRedmine(false)));
  }, [dispatch, isLoadingRedmine, refresh]);

  function getRoleUser(redmine: Redmine): number {
    const redmineUser = redmine.redmine_users.find(
      user => user.user.id === userAuth.user?.id,
    );

    return redmineUser?.role || EnumRoleRedmine.Contributor;
  }

  async function DeleteRedmine() {
    const idDelete = stateDeleteRedmine.payload?.id as string;

    DeleteRedminesService(idDelete)
      .then(() => {
        toast.success('Sucesso');
        setStateDeleteRedmine({ open: false });
        setRefresh(true);
      })
      .catch(e => {
        const error = e as AppError;

        toast(error.message, { type: error.type as TypeOptions });
      });
  }

  async function SyncRedmine() {
    setStateSyncRedmine({ open: false });
    const id = stateSyncRedmine.payload?.id as string;
    dispatch(setIsLoadingProcess(true));

    SyncUsersRedmineService(id)
      .then(() => {
        toast.success('Sucesso');
      })
      .catch(e => {
        const error = e as AppError;

        toast(error.message, { type: error.type as TypeOptions });
      })
      .finally(() => {
        dispatch(setIsLoadingProcess(false));
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
      <If test={refresh}>
        <DivCircularProgress>
          <CircularProgress />
        </DivCircularProgress>
      </If>
      <If test={!refresh && redmines.length === 0}>
        <DivNoData>
          <NoDataSvg />
        </DivNoData>
      </If>
      <If test={!refresh && redmines.length > 0}>
        <TableContainer component={Paper} variant="outlined" square={true}>
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
