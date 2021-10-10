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

import api from '../../../../services/api';
import LinkRouter from '../../../../components/LinkRouter';
import NoDataSvg from '../../../../components/NoDataSvg';
import If from '../../../../components/If';

import { Root, DivHeaderPage, HeaderPage, DivNoData } from './styles';
import { Redmine } from '../typesRedmine';

export default function Index() {
  const [redmines, setRedmines] = useState<Redmine[]>([]);

  useEffect(() => {
    //Todo: Implementar catch
    api.get<Redmine[]>('redmine').then(response => {
      setRedmines(response.data);
    });
  }, []);

  return (
    <Root maxWidth="lg">
      <DivHeaderPage>
        <HeaderPage>
          <Typography variant="h5">Redmines cadastrados</Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
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
                    <IconButton
                      color="inherit"
                      aria-label="upload picture"
                      component="span"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="inherit"
                      aria-label="upload picture"
                      component="span"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color="inherit"
                      aria-label="upload picture"
                      component="span"
                    >
                      <ExitToAppIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </If>
    </Root>
  );
}
