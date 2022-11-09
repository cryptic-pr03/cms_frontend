import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Stack from '@mui/material/Stack';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { getCurrentUser } from '../../helpers/AuthManager';
import { getFormattedDate, getFormattedTime } from '../../config/utils';
import { myPrivateAxios } from '../../config/axios';

// prop-slotID
export default function AddSlotModal({ slotsList }) {
  console.log(slotsList);
  const getCurrentDate = (separator = '-') => {
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`;
  };

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [slotObj, setSlotObj] = useState([]);
  const [currency, setCurrency] = React.useState('EUR');
  const date = new Date();

  const showTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const [startTime, setStartTime] = React.useState(showTime);
  const [endTime, setEndTime] = React.useState(showTime);
  //   console.log(startTime);
  //   console.log(endTime);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleStartTime = (newValue) => {
    setStartTime(newValue);
    // const time=
    console.log('start');
    console.log(startTime);
    console.log('end');
  };
  const handleEndTime = (newValue) => {
    setEndTime(newValue);
    console.log(endTime);
  };
  const handleChange1 = (event) => {
    setCurrency(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register, watch, handleSubmit, formState: { errors }, control,
  } = useForm({
    mode: 'onBlur',
  });

  const submitAddSlot = async (data) => {
    console.log(data);
    // let sl = slotsList;
    // console.log(sl);
    // sl = sl.slice().sort(function (a, b) { return a.slotId <= b.slotId; });
    // console.log(sl);
    data = {
      ...data,
      venueId: getCurrentUser().user.venueId,
      slotId: slotsList?.slice(-1)[0]?.slotId + 1 ?? 1,
      slotDate: getFormattedDate(data.slotDate),
      isRented: false,
      startTime: getFormattedTime(data.startTime),
      endTime: getFormattedTime(data.endTime),
    }
    console.log(data);
    try {
      await myPrivateAxios({
        method: 'post',
        url: '/slot',
        data
      }).then((res) => {
        console.log(res);
        alert("Slot Added");
        window.location.reload();
      });
    } catch (err) {
      alert(err.response);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <AddIcon />
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Add Slots</DialogTitle>
        <Box component="form" onSubmit={handleSubmit(submitAddSlot)} noValidate sx={{ mt: 1, mb: 0 }}>
          <DialogContent>

            <Controller
              name="slotDate"
              control={control}
              render={
                ({ field: { onChange, ...restField } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      fullWidth
                      label="Date of Slot"
                      inputFormat="DD/MM/YYYY"
                      disablePast
                      onChange={(event) => { onChange(event); }}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                        />
                      )}
                      {...restField}
                    />
                  </LocalizationProvider>
                )
              }
            />

            <Controller
              name="startTime"
              control={control}
              render={
                ({ field: { onChange, ...restField } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3} marginTop={3}>
                      <TimePicker
                        defaultValue={slotObj ? slotObj.startTime : ''}
                        label="Start Time"
                        // value={startTime}
                        onChange={(event) => { onChange(event); }}
                        renderInput={(params) => <TextField required {...params} />}
                        {...restField}
                      />
                    </Stack>
                  </LocalizationProvider>
                )
              }
            />
            <Controller
              name="endTime"
              control={control}
              render={
                ({ field: { onChange, ...restField } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3} marginTop={2}>
                      <TimePicker
                        label="End Time"
                        // value={endTime}
                        onChange={(event) => { onChange(event); }}
                        renderInput={(params) => <TextField defaultValue={slotObj ? slotObj.endTime : ''} required {...params} />}
                        {...restField}
                      />
                    </Stack>
                  </LocalizationProvider>
                )
              }
            />
            <TextField
              defaultValue={slotObj ? slotObj.price : ''}
              autoFocus
              margin="normal"
              id="standard-adornment-amount"
              label="Price (₹)"
              name="price"
              type={"number"}
              required
              {...register('price', {
                required: 'Amount Required',
                pattern: {
                  // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  value: '^\\d+(\\.\\d{1,2})?$',
                  message: 'Invalid Amount',
                },
              })}
              error={Boolean(errors.price)}
              helperText={errors.price?.message}
            />



          </DialogContent>

          <DialogActions>
            <Button type="submit">Submit</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Box>
      </Dialog>

    </div >
  );
}
