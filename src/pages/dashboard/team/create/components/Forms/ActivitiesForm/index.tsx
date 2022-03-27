import {
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
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useContext, useState } from 'react';
import {
  CreateTeamContext,
  CreateTeamContextType,
} from '../../../context/CreateTeamContext';
import DialogAddActvity from './components/DialogAddActvity';
import { DivHeader } from './styles';

export default function ActivitiesForm() {
  const createTeamContext = useContext(
    CreateTeamContext,
  ) as CreateTeamContextType;

  const { activities } = createTeamContext.state;
  const { removeActivity } = createTeamContext.actions;
  const [openDialogAddActivity, setOpenDialogAddActivity] = useState(false);

  return (
    <>
      <DivHeader>
        <Tooltip title="Adicionar">
          <IconButton
            aria-label="add"
            onClick={() => setOpenDialogAddActivity(true)}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" gutterBottom>
          Atividades
        </Typography>
      </DivHeader>
      <TableContainer component={Paper} variant="outlined" square={true}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Atividades Redmine</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map(activity => (
              <TableRow key={activity.name}>
                <TableCell component="th" scope="row">
                  {activity.name}
                </TableCell>
                <TableCell>
                  {activity.activities_redmine.map(e => e.name).join(', ')}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Excluir" aria-label="Delete">
                    <IconButton
                      color="inherit"
                      onClick={() => removeActivity(activity)}
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
      <DialogAddActvity
        open={openDialogAddActivity}
        handleClose={() => setOpenDialogAddActivity(false)}
      />
    </>
  );
}
