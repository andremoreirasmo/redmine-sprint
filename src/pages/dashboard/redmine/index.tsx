import { Breadcrumbs, Button, Link, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import googleIcon from '../../../assets/google_icon.svg';
import DividerWithText from '../../../components/DividerWithText';
import LinkRouter from '../../../components/LinkRouter';
import DataGrid from '../../../components/DataGrid';

import { Root, HeaderPage } from './styles';

export default function Redmine() {
  return (
    <Root maxWidth="lg">
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
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid />
      </div>
    </Root>
  );
}
