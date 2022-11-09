import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { DataGrid, GridToolbar, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddSlotModal from '../components/modals/AddSlotModal';
import { myPrivateAxios } from '../config/axios'
import { getCurrentUser } from '../helpers/AuthManager';
import Layoutt from '../layouts/Layoutt';

const SlotsPage = () => {
  const [slotsList, setSlotsList] = useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const navigate = useNavigate();

  async function getAllSlots() {
    await myPrivateAxios({
      method: 'get',
      url: "/slot/all"
    }).then((res) => {
      console.log(res.data);
      if (getCurrentUser().typeUserCode == 4) {
        res.data = res.data.filter((s) => s.venueId == getCurrentUser().user.venueId);
        console.log(res.data);
      }
      for (let i = 0; i < res.data.length; i += 1) {
        res.data[i] = {  ...res.data[i],id:i };
      }
      setSlotsList(res.data);
    }).catch((err) => alert(err.response));
  }

  useEffect(() => {
    getAllSlots();
  }, [])



  function SlotDataGrid() {
    const [loading, setLoading] = useState(false);

    async function handleDelete(deleteSlot) {
      setLoading(true);
      if (deleteSlot.isRented) {
        alert("SLOT ALREADY BOOKED! CAN'T DELETE!!");
        setLoading(false);
        return;
      } 
      await myPrivateAxios({
        method: 'delete',
        url: `/slot/${deleteSlot.venueId}/${deleteSlot.slotId}/${deleteSlot.slotDate}`,
      }).then((res) => {
        console.log(res.data);
        setLoading(false);
        setSlotsList((slotsList) => slotsList.filter((s) => s.slotId !== deleteSlot.slotId))
      }).catch((err) => console.log(err));
    }


    const headings = [
      { field: 'name', headerName: 'Venue', width: 150 },
      { field: 'city', headerName: 'City', width: 150 },
      { field: 'state', headerName: 'State', width: 150 },
      { field: 'slotDate', headerName: 'Date', width: 100, },
      { field: 'startTime', headerName: 'Start', width: 100 },
      { field: 'endTime', headerName: 'End', width: 100 },
      { field: 'price', headerName: 'Price', width: 100 },
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
                navigate(`/venueDetails/${cellValues.row.venueId}`)
              }}
            >
              View More
            </Button>
          );
        },
      },
      (getCurrentUser().typeUserCode == 4 &&
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
      )

    ];

    return (
      <>
        <div style={{ display: 'flex', height: '80vh', flexGrow: 1 }}>
          <DataGrid
            sx={{
              boxShadow: 1,
              backgroundColor: "#ffffff",
              p: 3
            }}
            rows={slotsList}
            columns={headings}

            rowsPerPageOptions={[5]}
            components={{
              LoadingOverlay: LinearProgress,
              Toolbar: GridToolbar,
            }}
            checkboxSelection
            isRowSelectable={(GridRowParams) => !GridRowParams.row.isRented}
            loading={loading}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
          />

        </div>
        <Box >
        </Box>
      </>
    );
  }
  return (
    <Layoutt contentData={
      <>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          marginBottom: '10px'
        }}>
          <Typography variant="h4" sx={{ m: 3 }} >
            SLOTS
          </Typography>
          {getCurrentUser().typeUserCode === 4 && <AddSlotModal slotsList={slotsList} />}
        </Box>
        {SlotDataGrid()}
      </>
    }
    />
  );
}

export default SlotsPage;


