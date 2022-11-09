import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Navigate, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useState } from 'react';
import AddStaffModal from '../modals/AddStaffModal';
import { Button, LinearProgress } from '@mui/material';
import { myPrivateAxios } from '../../config/axios';

export default function StaffDataGrid({ staff, updateStateOnDelete }) {
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleDelete(deleteStaff) {
    setLoading(true);
    await myPrivateAxios({
      method: 'delete',
      url: `/staff/${deleteStaff.staffId}`,
    }).then((res) => {
      console.log(res.data);
      updateStateOnDelete(deleteStaff);
      setLoading(false);
    }).catch((err) => console.log(err));
  }

  
  const headings = [
    { field: 'staffId', headerName: 'StaffId', width: 100 },
    { field: 'firstName', headerName: 'First Name', width: 200 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    { field: 'email', headerName: 'Email Address', width: 250 , },
    { field: 'contactNo', headerName: 'Contact Number', width: 150 },
    {
      field: "VIEW MORE",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="text"
            color="primary"
            onClick={(e) => {
              setLoading((prevState) => !prevState);
              // handleClick(event, cellValues);
              e.stopPropagation();
              console.log(cellValues);
              navigate(`/staffDetails/${cellValues.row.staffId}`)
            }}
          >
        View More
          </Button>
        );
      },
      width: 110,
      headerAlign: 'center', 
    },
    {
      field: "DELETE",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="text"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              console.log(cellValues.row);
              handleDelete(cellValues.row);
            }}
          >
          DELETE
          </Button>
        );
      },
      width: 80,
      headerAlign: 'center', 
    }
  ];
  return (
    <div style={{ display: 'flex', height: '80vh',flexGrow: 1 }}>
      <DataGrid
        sx={{
          boxShadow:1,
          backgroundColor: "#ffffff",
          p:5
        }}
        rows={staff}
        columns={headings}
        disableSelectionOnClick
        components={{
          LoadingOverlay: LinearProgress,
          Toolbar: GridToolbar,
        }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        loading = {loading}
      />
    </div>
  );
}
