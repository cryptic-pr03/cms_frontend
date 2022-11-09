import { Box, LinearProgress, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { myPrivateAxios } from "../../config/axios";
import SlotPayDialog from "../modals/EVENTCOMPLETE";


export default function SlotsDataGrid({ slotsList, selectionModel, setSelectionModel, setStep }) {
  const [pageSize,setPageSize] = useState(5);

  const headings = [
    { field: 'name', headerName: 'Venue', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'slotDate', headerName: 'Date', width: 100, },
    { field: 'startTime', headerName: 'Start', width: 100 },
    { field: 'endTime', headerName: 'End', width: 100 },
    { field: 'price', headerName: 'Price', width: 100 },
    // {
    //   field: "VIEW MORE",
    //   renderCell: (cellValues) => {
    //     return (
    //       <Button
    //         variant="text"
    //         color="primary"
    //         onClick={(e) => {
    //           setLoading((prevState) => !prevState);
    //           // handleClick(event, cellValues);
    //           e.stopPropagation();
    //           console.log(cellValues);
    //           navigate(`/venueDetails/${cellValues.row.venueId}`);
    //         }}
    //       >
    //         View More
    //       </Button>
    //     );
    //   },
    // },

  ];


  function getCost(selectionModel) {
    let sum = 0;
    for (const s of selectionModel) {
      sum = sum + parseInt(slotsList[s].price);
    }
    return sum;
  }

  return (
    <>
      <div style={{ display: 'flex', height: '90vh', flexGrow: 1 }}>
        <DataGrid
          sx={{
            boxShadow: 1,
            backgroundColor: "#ffffff",
            p: 3
          }}
          rows={slotsList}
          columns={headings}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          components={{
            LoadingOverlay: LinearProgress,
            Toolbar: GridToolbar,
          }}
          checkboxSelection
          isRowSelectable={(GridRowParams) => !GridRowParams.row.isRented}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
        />

      </div>
      <Box >
        Amount : {getCost(selectionModel)}
      </Box>
    </>
  );
}