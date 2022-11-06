import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { Backdrop, CircularProgress, Typography } from '@mui/material';
import myAxios from '../../config/axios';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export default function AddVenueModal({ mode, venueProp, updateState }) {
  console.dir(updateState);
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register, watch, handleSubmit, formState: { errors }, control,
  } = useForm({
    mode: 'onBlur',
  });

  const handleOnSubmit = async (data) => {
    setloading(true);
    data = {
      ...data,
      venueId: venueProp?.venueId ?? 0,
    };
    console.log(data);
    await myAxios({
      method: (mode === "ADD" ? 'post' : 'put'),
      url: '/venue',
      data
    }).then((res) => {
      console.log("res", res.data);
      setOpen(false);
      updateState(res.data);
      // setloading(false);
    }).catch((err) => console.log("error", err.response));
  }


  return (
    <>
      {/* {loading && <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer +  1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>} */}

      <Button variant="text" onClick={handleClickOpen}>
        {mode == "ADD" && <AddIcon />}
        {mode == "EDIT" && <EditIcon />}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Add Venue</DialogTitle>
        <Grid container>
          <Box
            component="form"
            onSubmit={handleSubmit(handleOnSubmit)}
            noValidate
          >
            <DialogContent>
              <DialogContentText textAlign="center">
                Create Venue
              </DialogContentText>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}
              >
                <TextField
                  autoFocus
                  margin="normal"
                  name="name"
                  id="name"
                  label="Venue Name"
                  defaultValue={venueProp?.name}
                  required
                  {...register('name', {
                    required: 'Name Required',
                  })}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />

                {/* <TextField
                  margin="normal"
                  label="Capacity"
                  id="capacity"
                  name="capacity"
                  required
                  {...register('capacity', {
                    required: 'Capacity Required',
                    pattern: {
                      value: '^[1-9][0-9]*$',
                      message: 'Invalid Capacity',
                    },
                  })}
                  error={Boolean(errors.capacity)}
                  helperText={errors.capacity?.message}
                /> */}

                <TextField
                  margin="normal"
                  label="City"
                  name="city"
                  id="city"
                  required
                  defaultValue={venueProp?.city}
                  {...register('city', {
                    required: 'City Required',
                  })}
                  error={Boolean(errors.city)}
                  helperText={errors.city?.message}
                />
                <TextField
                  margin="normal"
                  label="Landmark"
                  name="landmark"
                  id="landmark"
                  required
                  defaultValue={venueProp?.landmark}
                  {...register('landmark', {
                    required: 'Landmark Required',
                  })}
                  error={Boolean(errors.landmark)}
                  helperText={errors.landmark?.message}
                />
                <TextField
                  margin="normal"
                  label="State"
                  name="state"
                  id="state"
                  required
                  defaultValue={venueProp?.state}
                  {...register('state', {
                    required: 'State Required',
                  })}
                  error={Boolean(errors.state)}
                  helperText={errors.state?.message}
                />

                {/* <TextField
                  margin="normal"
                  label="Pics Seat Matrix URL"
                  name="picSeatMatrixUrl"
                  namid="picSeatMatrixUrl"
                  required
                  {...register('picSeatMatrixUrl', {
                    required: 'Pics Seat Matrix URL',
                  })}
                  error={Boolean(errors.picSeatMatrixUrl)}
                  helperText={errors.picSeatMatrixUrl?.message}
                /> */}
                {/* <Box width="100%"> */}
                <Typography width="100%" sx={{ textAlign: 'center', }}>
                  SEAT MATRIX DESCRIPTION
                </Typography>
                <TextField
                  margin="normal"
                  label="Number of Silver Seats"
                  id="silverSeats"
                  name="silverSeats"
                  type="number"
                  inputProps={{
                    readOnly: (mode == "EDIT"),
                    className: "Mui-disabled"
                  }}

                  defaultValue={venueProp?.silverSeats}
                  required
                  {...register('silverSeats', {
                    required: 'Number of Silver Seats Required',
                  })}
                  error={Boolean(errors.silverSeats)}
                  helperText={errors.silverSeats?.message}
                />
                <TextField
                  margin="normal"
                  label="Number of Gold Seats"
                  id="goldSeats"
                  name="goldSeats"
                  type="number"
                  defaultValue={venueProp?.goldSeats}
                  inputProps={{
                    readOnly: (mode == "EDIT"),
                    className: "Mui-disabled"
                  }}
                  required
                  {...register('goldSeats', {
                    required: 'Number of Gold Seats Required',
                  })}
                  error={Boolean(errors.goldSeats)}
                  helperText={errors.goldSeats?.message}
                />
                <TextField
                  margin="normal"
                  label="Number of Platinum Seats"
                  id="platinumSeats"
                  name="platinumSeats"
                  type="number"
                  inputProps={{
                    readOnly: (mode == "EDIT"),
                    className: "Mui-disabled"
                  }}
                  defaultValue={venueProp?.platinumSeats}
                  required
                  {...register('platinumSeats', {
                    required: 'Number of Platinum Seats Required',
                  })}
                  error={Boolean(errors.platinumSeats)}
                  helperText={errors.platinumSeats?.message}
                />

                {/* </Box> */}



              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} disabled={loading} >Cancel</Button>
              <Button type="submit" disabled={loading}>Submit</Button>
            </DialogActions>
          </Box>
        </Grid>
      </Dialog>
    </>
  );
}
