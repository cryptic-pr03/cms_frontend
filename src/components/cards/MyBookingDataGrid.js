import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import { getCurrentUser } from '../../helpers/AuthManager';
import myAxios from '../../config/axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyBookingDataGrid({info}) {
  const [pageSize, setPageSize] = useState(10);

  console.log(info);
  const headings = [
    { field: 'eventName', headerName: 'Event Name', width: 150 },
    { field: 'seatId', headerName: 'Seat No.', width: 100 },
    { field: 'venueName', headerName: 'Venue Name', width: 150 },
    { field: 'date', headerName: 'Date', width: 100, },
    { field: 'time', headerName: 'Time', width: 100, },
    { field: 'amount', headerName: 'Amount Paid', width: 200 },
    { field: 'transactionId', headerName: 'Transaction Number', width: 200 },

  ];

  console.log(info);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '80vh', flexGrow: 1 }}>
        <DataGrid
          sx={{
            boxShadow: 1,
            backgroundColor: "#ffffff",
            p: 3
          }}
          rows={info}
          columns={headings}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          components={{
            LoadingOverlay: LinearProgress,
            Toolbar: GridToolbar,
          }}
        />

      </div>
    </Box>
  );
}