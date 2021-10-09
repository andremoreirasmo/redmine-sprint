import { DataGrid as DataGridMui } from '@mui/x-data-grid';
import CustomNoRowsOverlay from './DataGridNoRowsOverlay/';

const columns = [
  { field: 'ID', width: 150 },
  { field: 'Nome', width: 350 },
  { field: 'URL', width: 150 },
];

export default function DataGrid() {
  return (
    <DataGridMui
      components={{
        NoRowsOverlay: CustomNoRowsOverlay,
      }}
      rows={[]}
      columns={columns}
    />
  );
}
