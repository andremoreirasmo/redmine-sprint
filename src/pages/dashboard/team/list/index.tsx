import DialogConfirmation, {
  DialogConfirmationState,
} from '@/components/DialogConfirmation';
import If from '@/components/If';
import LinkRouter from '@/components/LinkRouter';
import NoDataSvg from '@/components/NoDataSvg';
import AppError from '@/shared/errors/AppError';
import { RootState } from '@/store';
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
import { toast, TypeOptions } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Team } from '../types/Team';
import { DeleteTeamService } from './services/DeleteTeamService';
import { FetchTeamsService } from './services/FetchTeamsService';
import {
  DivCircularProgress,
  DivHeaderPage,
  DivNoData,
  HeaderPage,
  Root,
} from './styles';

export default function Index() {
  const dispatch = useDispatch();

  const redmineSelectedId = useSelector(
    (state: RootState) => state.redmine.redmineSelectedId,
  );
  const [stateDeleteTeam, setStateDeleteTeam] = useState<
    DialogConfirmationState<Team>
  >({ open: false });
  const [teams, setTeams] = useState<Team[]>([]);

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (redmineSelectedId === '') {
      toast.warn('Selecione um Redmine');
      setTeams([]);
      setRefresh(false);
      return;
    }

    if (!refresh) {
      return;
    }

    FetchTeamsService(redmineSelectedId)
      .then(teams => {
        setRefresh(false);
        setTeams(teams);
      })
      .catch(e => {
        const error = e as AppError;

        toast(error.message, {
          type: error.type as TypeOptions,
        });

        setRefresh(false);
        setTeams([]);
      });
  }, [dispatch, redmineSelectedId, refresh]);

  async function DeleteTeam() {
    const idDelete = stateDeleteTeam.payload?.id as string;

    DeleteTeamService(idDelete)
      .then(() => {
        toast.success('Sucesso');

        setStateDeleteTeam({ open: false });
        setRefresh(true);
      })
      .catch(e => {
        const error = e as AppError;

        toast(error.message, {
          type: error.type as TypeOptions,
        });
      });
  }

  return (
    <Root maxWidth="lg">
      <DivHeaderPage>
        <HeaderPage>
          <Typography variant="h5">Equipes cadastradas</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/dashboard/team/create"
            disabled={redmineSelectedId === ''}
          >
            Nova Equipe
          </Button>
        </HeaderPage>
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter to="/dashboard" color="inherit">
            Dashboard
          </LinkRouter>
          <Typography color="textPrimary">Equipe</Typography>
        </Breadcrumbs>
      </DivHeaderPage>
      <If test={refresh}>
        <DivCircularProgress>
          <CircularProgress />
        </DivCircularProgress>
      </If>
      <If test={!refresh && teams.length === 0}>
        <DivNoData>
          <NoDataSvg />
        </DivNoData>
      </If>
      <If test={!refresh && teams.length > 0}>
        <TableContainer component={Paper} variant="outlined" square={true}>
          <Table aria-label="list team">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Horas por pontos</TableCell>
                <TableCell align="right">A????es</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams.map(team => (
                <TableRow hover key={team.id}>
                  <TableCell component="th" scope="row">
                    {team.name}
                  </TableCell>
                  <TableCell>{team.hours_per_point}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar" aria-label="Edit">
                      <IconButton
                        color="inherit"
                        component={RouterLink}
                        to={`/dashboard/team/edit/${team.id}`}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir" aria-label="Delete">
                      <IconButton
                        color="inherit"
                        component="span"
                        onClick={() =>
                          setStateDeleteTeam({
                            open: true,
                            payload: team,
                          })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </If>
      <DialogConfirmation
        title="Excluir equipe?"
        description="Todas as informa????es vinculadas a esse equipe ser??o excluidas permanentemente."
        open={stateDeleteTeam.open}
        onAccepted={() => {
          DeleteTeam();
        }}
        onRejected={() => {
          setStateDeleteTeam({ open: false });
        }}
      />
    </Root>
  );
}
