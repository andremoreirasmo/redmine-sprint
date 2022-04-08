import If from '@/components/If';
import NoDataSvg from '@/components/NoDataSvg';
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
import EditIcon from '@material-ui/icons/Edit';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IActivity, ICreateTeam } from '../../types';
import DialogAddActvity from './components/DialogAddActvity';
import { DivHeader, DivNoData } from './styles';

export default function ActivitiesForm() {
  const [openDialogAddActivity, setOpenDialogAddActivity] = useState(false);
  const [indexEditActivity, setIndexEditActivity] = useState(-1);
  const { errors, setErrors, touched, setTouched, values, setFieldValue } =
    useFormikContext<ICreateTeam>();
  const { activities } = values;

  useEffect(() => {
    if (errors.activities && touched.activities) {
      const onClose = () => {
        setErrors({});
        setTouched({});
      };

      toast.warn(errors.activities, { onClose });
    }
  }, [errors, setErrors, setTouched, touched.activities]);

  const removeActivity = (activity: IActivity) => {
    const index = activities.indexOf(activity);
    if (index > -1) {
      activities.splice(index, 1);
    }

    setFieldValue('activities', activities);
  };

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
      <If test={activities.length === 0}>
        <DivNoData>
          <NoDataSvg />
        </DivNoData>
      </If>
      <If test={activities.length > 0}>
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
              {activities.map((activity, index) => (
                <TableRow key={activity.name}>
                  <TableCell component="th" scope="row">
                    {activity.name}
                  </TableCell>
                  <TableCell>
                    {activity.redmine_activities.map(e => e.name).join(', ')}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar" aria-label="Edit">
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          setIndexEditActivity(index);
                          setOpenDialogAddActivity(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
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
      </If>
      <DialogAddActvity
        open={openDialogAddActivity}
        indexEditActivity={indexEditActivity}
        handleClose={() => {
          setOpenDialogAddActivity(false);
          setIndexEditActivity(-1);
        }}
      />
    </>
  );
}
