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
import myAxios from '../../config/axios';

export default function AddSeat() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

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
        url: '/seat',
        data: {
          ...data,
          venueId: 1,
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

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Seat
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle textAlign="center">Add Seat</DialogTitle>
        <Box
          component="form"
          onSubmit={handleSubmit(submitAddVenue)}
          noValidate

        >
          <DialogContent>
            <DialogContentText textAlign="center">
              Add Seat
            </DialogContentText>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              // justifyContent: 'space-around',
              // flexWrap: 'wrap',
              // p: 5,
              // m: 3,
            }}
            >
              <TextField
                autoFocus
                margin="normal"
                id="standard-adornment-amount"
                label="Seat Id"
                name="seatId"
                required
                {...register('seatId', {
                  required: 'Seat Id Required',
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
                label="Seat Type"
                name="seatType"
                required
                {...register('seatType', {
                  required: 'Seat Type Required',
                })}
                error={Boolean(errors.price)}
                helperText={errors.price?.message}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Submit</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Box>
      </Dialog>

    </div>
  );
}
