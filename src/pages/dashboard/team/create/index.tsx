import { Breadcrumbs, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import LinkRouter from '@/components/LinkRouter';
import FormCreate from './components/FormCreate';
import CreateRedmineProvider from './context/CreateRedmineContext';
import { DivHeaderPage, HeaderPage, Root } from './styles';

interface RouteParams {
  idTeam: string;
}

export default function Index() {
  const { idTeam } = useParams<RouteParams>();
  const isEditMode = idTeam != null;
  const caption = isEditMode ? 'Editar' : 'Nova';

  return (
    <CreateRedmineProvider>
      <Root maxWidth="lg">
        <DivHeaderPage>
          <HeaderPage>
            <Typography variant="h5">{caption} Equipe</Typography>
          </HeaderPage>
          <Breadcrumbs aria-label="breadcrumb">
            <LinkRouter to="/dashboard" color="inherit">
              Dashboard
            </LinkRouter>
            <LinkRouter to="/dashboard/redmine/" color="inherit">
              Equipe
            </LinkRouter>
            <Typography color="textPrimary">{caption} Equipe</Typography>
          </Breadcrumbs>
        </DivHeaderPage>
        <FormCreate isEditMode={isEditMode} idTeam={idTeam} />
      </Root>
    </CreateRedmineProvider>
  );
}
