import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import myAxios from '../../config/axios';

export default function AddVenue({ prop }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [venueObj, setVenueObj] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(prop);
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

  const submitAddVenue = async (data) => {
    console.log(data);
    try {
      await myAxios({
        method: 'post',
        url: '/venue',
        data: {
          ...data,
          venueId: 0,
          isFunctional: 1,
          // eslint-disable-next-line no-unsafe-optional-chaining
        },
      }).then((res) => {
        console.log(res);
        alert(res.data);
        navigate('/events');
      });
    } catch (err) {
      alert(err.response.data);
    }
  };

  const getVenue = async () => {
    try {
      await myAxios({
        method: 'get',
        url: `/venue/id/${prop}`,
      }).then((res) => {
        console.log(res.data);
        setVenueObj(res.data);
        console.log(venueObj);
        setDisableButton(venueObj.isFunctional === 0);
        // alert(res.data);
      });
    } catch (err) {
      alert(err.response.data);
    }
  };
  // getVenue();

  console.log('use');
  useEffect(() => {
    console.log('useEffect');
    console.log('useeffct');
    getVenue();
  }, []);

  return (
    <div>
      {/* {loading && <CircularProgress />}
      {!loading && ( */}
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Venue
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle textAlign="center">Add Venue</DialogTitle>
          <Grid container>
            <Box
              component="form"
              onSubmit={handleSubmit(submitAddVenue)}
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
                  // flexWrap: 'wrap',
                  // p: 5,
                  // m: 3,
                }}
                >
                  <TextField
                    defaultValue={venueObj ? venueObj.eventName : ''}
                    autoFocus
                    margin="normal"
                    id="standard-adornment-amount"
                    label="Venue Name"
                    name="name"
                    required
                    {...register('name', {
                      required: 'Name Required',
                    })}
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                  />
                  <TextField
                    autoFocus
                    margin="normal"
                    id="standard-adornment-amount"
                    label="Capacity"
                    name="capacity"
                    required
                    {...register('capacity', {
                      required: 'Capacity Required',
                      pattern: {
                        value: '^[1-9][0-9]*$',
                        message: 'Invalid Capacity',
                      },
                    })}
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                  />
                  <TextField
                    autoFocus
                    margin="normal"
                    id="standard-adornment-amount"
                    label="City"
                    name="city"
                    required
                    {...register('city', {
                      required: 'City Required',
                    })}
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                  />
                  <TextField
                    autoFocus
                    margin="normal"
                    id="standard-adornment-amount"
                    label="Landmark"
                    name="landmark"
                    required
                    {...register('landmark', {
                      required: 'Landmark Required',
                    })}
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                  />
                  <TextField
                    autoFocus
                    margin="normal"
                    id="standard-adornment-amount"
                    label="State"
                    name="state"
                    required
                    {...register('state', {
                      required: 'State Required',
                    })}
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                  />
                  <TextField
                    autoFocus
                    margin="normal"
                    id="standard-adornment-amount"
                    label="Seat Matrix Description"
                    name="seatMatrixDescription"
                    required
                    {...register('seatMatrixDescription', {
                      required: 'Seat Matrix Description Required',
                    })}
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                  />
                  <TextField
                    autoFocus
                    margin="normal"
                    id="standard-adornment-amount"
                    label="Pics Seat Matrix URL"
                    name="picSeatMatrixUrl"
                    required
                    {...register('picSeatMatrixUrl', {
                      required: 'Pics Seat Matrix URL',
                    })}
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                  />
                </Box>
                {/* <DialogContentText textAlign="left" sx={{ mt: '30px' }}>
                  Create Venue
                </DialogContentText> */}

              </DialogContent>
              {/* <Box>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    margin="normal"
                    id="standard-adornment-amount"
                    label="Seat Name"
                    name="name"
                    required
                    {...register('name', {
                      required: 'Event Name Required',
                    })}
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                  />
                </Grid>
              </Box> */}
              <DialogActions>
                <Button type="submit">Submit</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </DialogActions>
            </Box>
          </Grid>
        </Dialog>
      </div>
      {/* )} */}
    </div>
  );
}
