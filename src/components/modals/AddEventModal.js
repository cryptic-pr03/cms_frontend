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
import myAxios, { myPrivateAxios } from '../../config/axios';
import { getFormattedDate, getFormattedTime } from '../../helpers/utils';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


export default function AddEventModal({ selectedSlots, updateState }) {

  const {
    register, watch, handleSubmit, formState: { errors }, control,
  } = useForm({
    mode: 'onBlur',
  });

  //updateStateOnAdd addedEvent
  const submitAddEvent = async (data) => {
    console.log("Requesting here :");
    data = {
      ...data,
      eventId: 0,
      eventDate: getFormattedDate(data.eventDate),
      startTime: getFormattedTime(data.startTime),
      endTime: getFormattedTime(data.endTime),
      slots: selectedSlots
    }
    console.log(data);
    // await myPrivateAxios({
    //   method: 'post',
    //   url: '/event',
    //   data
    // }).then((res) => {
    //   console.log(res.data);
    //   // navigate('/events');
    // }).catch((err) =>
    //   console.log(err.response.data));
  }

  return (
    <>
      <Grid container
        component="form"
        onSubmit={handleSubmit(submitAddEvent)}
        noValidate
        spacing={2}
      >

        <Grid item xs={4}>
          <Box> </Box>
          <TextField
            // defaultValue={eventObj ? eventObj.eventName : ''}
            fullWidth
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
        <Grid item xs={4}>
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
        <Grid item xs={4}>
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
        <Grid item xs={4}>
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
        <Grid item xs={4}>
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
        <Grid item xs={4}>
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
        <Grid item xs={12}>
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

        <Button variant="contained" type="submit" disabled={!selectedSlots.length}> PAY NOW </Button>
      </Grid>

    </>
  );
}
