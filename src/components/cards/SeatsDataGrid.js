import { Box, LinearProgress, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { myPrivateAxios } from "../../config/axios";
import SlotPayDialog from "../modals/EVENTCOMPLETE";


export default function SeatsDataGrid({ seatsList, selectionModel, setSelectionModel }) {
  console.log(seatsList);


  const headings = [
    { field: 'seatId', headerName: 'Seat No.', width: 150 },
    { field: 'seatType', headerName: 'Category', width: 100, },
    { field: 'price', headerName: 'Price', width: 100 },
  ];


  function getCost(selectionModel) {
    let sum = 0;
    for (const s of selectionModel) {
      sum = sum + parseInt(seatsList[s].price);
    }
    return sum;
  }

  return (
    <>
      <div style={{ display: 'flex', height: '80vh', flexGrow: 1 }}>
        <DataGrid
          sx={{
            boxShadow: 1,
            backgroundColor: "#ffffff",
            p: 3
          }}
          rows={seatsList}
          columns={headings}

          rowsPerPageOptions={[5]}
          components={{
            LoadingOverlay: LinearProgress,
            Toolbar: GridToolbar,
          }}
          checkboxSelection
          isRowSelectable={(GridRowParams) => !GridRowParams.row.isBooked}
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