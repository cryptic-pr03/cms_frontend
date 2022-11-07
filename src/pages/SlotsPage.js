import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { DataGrid, GridToolbar, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SlotPayDialog from '../components/modals/SlotPayDialog';
import { myPrivateAxios } from '../config/axios'
import Layoutt from '../layouts/Layoutt';

const SlotsPage = () => {
  const [slotsList, setSlotsList] = useState({}); 
  const [selectionModel, setSelectionModel] = React.useState([]);
  const navigate = useNavigate();

  function getCost(selectionModel){
    let sum = 0;
    for(const s of selectionModel){
      sum = sum + parseInt(slotsList[s].price);
    }
    return sum;
  }


  async function getAllSlots(){
    await myPrivateAxios({
      method:'get',
      url : "/slot/all"
    }).then((res)=>{
      console.log(res.data);
      for (let i = 0; i < res.data.length; i += 1) {
        res.data[i] = { id: i, ...res.data[i] };
      }
      setSlotsList(res.data);
    }).catch((err)=> alert(err.response));
  }

  function getSelectedSlots(selectionModel){
    const temp= [];
    for(const s of selectionModel){
      temp.push(slotsList[s]);
    }
    return temp;
  }
  useEffect(() => {
    getAllSlots();  
  }, [])



  function SlotDataGrid(){
    const [loading, setLoading] = useState(false);

    async function handleDelete(deleteStaff) {
      setLoading(true);
      await myPrivateAxios({
        method: 'delete',
        url: `/staff/${deleteStaff.staffId}`,
      }).then((res) => {
        console.log(res.data);
        setLoading(false);
      }).catch((err) => console.log(err));
    }

  
    const headings = [
      { field: 'name', headerName: 'Venue', width: 150 },
      { field: 'city', headerName: 'City', width: 150 },
      { field: 'state', headerName: 'State', width: 150 },
      { field: 'slotDate', headerName: 'Date', width: 100 , },
      { field: 'startTime', headerName: 'Start', width: 100 },
      { field: 'endTime', headerName: 'End', width: 100},
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

    ];

    return (
      <>
        <div style={{ display: 'flex', height: '80vh',flexGrow: 1 }}>
          <DataGrid
            sx={{
              boxShadow:1,
              backgroundColor: "#ffffff",
              p:3
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
            loading = {loading}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
          />

        </div>
        <Box >


          
          <Typography > AMOUNT : {getCost(selectionModel)}</Typography>
          <SlotPayDialog selectedSlots = {getSelectedSlots(selectionModel)}/>
        </Box>
      </>
    );
  }
  return (
    <>
      <Layoutt contentData={SlotDataGrid()}/>
    </>
  )
}

export default SlotsPage;


  