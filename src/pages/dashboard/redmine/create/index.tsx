import { Breadcrumbs, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import LinkRouter from '@/components/LinkRouter';
import FormCreate from './components/FormCreate';
import CreateRedmineProvider from './context/CreateRedmineContext';
import { DivHeaderPage, HeaderPage, Root } from './styles';

interface RouteParams {
  idRedmine: string;
}

export default function Index() {
  const { idRedmine } = useParams<RouteParams>();
  const isEditMode = idRedmine != null;
  const caption = isEditMode ? 'Editar' : 'Novo';

  return (
    <CreateRedmineProvider>
      <Root maxWidth="lg">
        <DivHeaderPage>
          <HeaderPage>
            <Typography variant="h5">{caption} Redmine</Typography>
          </HeaderPage>
          <Breadcrumbs aria-label="breadcrumb">
            <LinkRouter to="/dashboard" color="inherit">
              Dashboard
            </LinkRouter>
            <LinkRouter to="/dashboard/redmine/" color="inherit">
              Redmine
            </LinkRouter>
            <Typography color="textPrimary">{caption} Redmine</Typography>
          </Breadcrumbs>
        </DivHeaderPage>
        <FormCreate isEditMode={isEditMode} idRedmine={idRedmine} />
      </Root>
    </CreateRedmineProvider>
  );
}
