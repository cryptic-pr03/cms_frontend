import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useState } from 'react';
import AddStaffModal from '../modals/AddStaffModal';

export default function StaffDataGrid({ staff }) {
  const navigate = useNavigate();

  const [finalClickInfo, setFinalClickInfo] = useState(null);

  const handleOnCellClick = (params) => {
    setFinalClickInfo(params);
    navigate(`/staffDetails/${finalClickInfo?.id}`);
  };

  const headings = [
    { field: 'staffId', headerName: 'StaffNumber', width: 100 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'Email Id', width: 200 },
    { field: 'contactNo', headerName: 'Contact Number', width: 200 },
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
        rows={staff}
        columns={headings}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{
          Toolbar: GridToolbar,
        }}
        onCellClick={handleOnCellClick}
      />
      {finalClickInfo
        && `Final clicked id = ${finalClickInfo.id}, 
        Final clicked field = ${finalClickInfo.field}, 
        Final clicked value = ${finalClickInfo.value}`}
      {!finalClickInfo && 'Click on a column'}


    </div>

  );
}
