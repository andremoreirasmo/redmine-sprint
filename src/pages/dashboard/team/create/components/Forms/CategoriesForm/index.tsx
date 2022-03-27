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
import { useContext, useState } from 'react';
import {
  CreateTeamContext,
  CreateTeamContextType,
} from '../../../context/CreateTeamContext';
import DialogAddCategory from './components/DialogAddCategory';
import { DivHeader, DivNoData } from './styles';

export default function CategoriesForm() {
  const createTeamContext = useContext(
    CreateTeamContext,
  ) as CreateTeamContextType;

  const { categories } = createTeamContext.state;
  const { removeCategory } = createTeamContext.actions;
  const [openDialogAddActivity, setOpenDialogAddActivity] = useState(false);
  const [indexEditCategory, setIndexEditCategory] = useState(-1);

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
          Categorias
        </Typography>
      </DivHeader>
      <If test={categories.length === 0}>
        <DivNoData>
          <NoDataSvg />
        </DivNoData>
      </If>
      <If test={categories.length > 0}>
        <TableContainer component={Paper} variant="outlined" square={true}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Categorias Redmine</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={category.name}>
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>
                  <TableCell>
                    {category.categories_redmine.map(e => e.name).join(', ')}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar" aria-label="Edit">
                      <IconButton
                        color="inherit"
                        onClick={() => {
                          setIndexEditCategory(index);
                          setOpenDialogAddActivity(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir" aria-label="Delete">
                      <IconButton
                        color="inherit"
                        onClick={() => removeCategory(category)}
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
      <DialogAddCategory
        open={openDialogAddActivity}
        indexEditCategory={indexEditCategory}
        handleClose={() => {
          setOpenDialogAddActivity(false);
          setIndexEditCategory(-1);
        }}
      />
    </>
  );
}
