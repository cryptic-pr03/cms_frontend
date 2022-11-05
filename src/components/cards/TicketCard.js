import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

export default function TicketCard({ tCard }) {
  const navigate = useNavigate();

  const headings = [
    {
      field: 'seatId', headerName: 'SeatNumber', width: 100, headerAlign: 'center',
    },
    {
      field: 'isBooked', headerName: 'Booking status', width: 130, headerAlign: 'center',
    },
    {
      field: 'price', headerName: 'Price', type: 'number', width: 100, headerAlign: 'center',
    },
    {
      field: 'seatType', headerName: 'Seat Type', width: 150, headerAlign: 'center',
    },
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'black',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        rows={tCard}
        columns={headings}
        pageSize={5}
        rowsPerPageOptions={[10]}
        components={{
          Toolbar: GridToolbar,
        }}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>

  );
}
