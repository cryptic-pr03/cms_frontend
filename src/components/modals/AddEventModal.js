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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import myAxios from '../../config/axios';
import { getFormattedDate, getFormattedTime } from '../../helpers/utils';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


export default function AddEventModal({mode , eventProp, updateState}) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [eventObj, setEventObj] = useState([]);
  const [disableButton, setDisableButton] = useState(false);


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

  const submitAddEvent = async (data) => {
    console.log("Requesting here :");
    // console.log(data);
    data = {
      ...data,
      eventId: 0,
      eventDate: getFormattedDate(data.eventDate),
      startTime: getFormattedTime(data.startTime),
      endTime: getFormattedTime(data.endTime),
    }
    console.log(data);
    await myAxios({
      method: 'post',
      url: '/event',
      data
    }).then((res) => {
      console.log(res.data);
      // navigate('/events');
    }).catch((err) =>
      console.log(err.response.data));
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {mode == "ADD" && <AddIcon />}
        {mode == "EDIT" && <EditIcon />}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Add Event</DialogTitle>
        <Grid container>
          <Box
            component="form"
            onSubmit={handleSubmit(submitAddEvent)}
            noValidate
          >
            <DialogContent>

              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
              >
                <Grid item xs={5}>
                  <Box> </Box>
                  <TextField
                    // defaultValue={eventObj ? eventObj.eventName : ''}
                    fullWidth
                    autoFocus
                    margin="normal"
                    id="standard-adornment-amount"
                    label="Event Name"
                    name="name"
                    required
                    {...register('name', {
                      required: 'Event Name Required',
                    })}
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Controller
                    name="eventDate"
                    control={control}
                    render={
                      ({ field: { onChange, ...restField } }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Stack spacing={3} marginTop={1}>
                            <DesktopDatePicker
                              label="Event Date"
                              inputFormat="DD/MM/YYYY"
                              disablePast
                              onChange={(event) => { onChange(event); }}
                              renderInput={(params) => (
                                <TextField
                                  // fullWidth
                                  required
                                  {...params}
                                />
                              )}
                              {...restField}
                            />
                          </Stack>
                        </LocalizationProvider>
                      )}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field: { onChange, ...restField } }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3} marginTop={3}>
                          <TimePicker
                            label="Start Time"
                            ampm={false}
                            onChange={(event) => { onChange(event); }}
                            renderInput={(params) => <TextField
                              // defaultValue={eventObj ? eventObj.eventStartTime : ''}
                              fullWidth required {...params} />}
                            {...restField}
                          />
                        </Stack>
                      </LocalizationProvider>
                    )}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Controller
                    name="endTime"
                    control={control}
                    render={({ field: { onChange, ...restField } }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3} marginTop={3}>
                          <TimePicker
                            label="End Time"
                            ampm={false}
                            onChange={(event) => { onChange(event); }}
                            renderInput={(params) => <TextField
                              // defaultValue={eventObj ? eventObj.endTime : ''} 
                              fullWidth required {...params} />}
                            {...restField}
                          />
                        </Stack>
                      </LocalizationProvider>
                    )}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    margin="normal"
                    id="standard-adornment-amount"
                    label="Age Limit"
                    name="ageLimit"
                    type="number"
                    required
                    {...register('ageLimit', {
                      required: 'Age Limit Required',
                      pattern: {
                        value: '^[1-9][0-9]*$',
                        message: 'Invalid Age Limit',
                      },
                    })}
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    margin="normal"
                    id="standard-adornment-amount"
                    label="Logo URL"
                    name="logoUrl"
                    required
                    {...register('logoUrl', {
                      required: 'Logo URL Required',
                    })}
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                  />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    id="standard-adornment-amount"
                    label="Description"
                    name="description"
                    required
                    {...register('description', {
                      required: 'Description Required',
                    })}
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                  />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    autoFocus
                    margin="normal"
                    id="standard-adornment-amount"
                    label="Sponsor Name"
                    name="sponsorName"
                    required
                    {...register('sponsorName', {
                      required: 'Sponsor Name Required',
                    })}
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                  />
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button type="submit">Submit</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Box>
        </Grid>
      </Dialog>

    </>
  );
}
