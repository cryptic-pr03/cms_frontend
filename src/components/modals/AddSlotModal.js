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
import myAxios from '../../config/axios';

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

// prop-slotID
export default function AddSlot({ prop }) {
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

    const showTime = `${date.getHours()
    }:${date.getMinutes()
    }:${date.getSeconds()}`;
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
        try {
            await myAxios({
                method: 'post',
                url: '/slot',
                data: {
                    ...data,
                    venueId: 1,
                    slotId: 1,
                    // eslint-disable-next-line no-unsafe-optional-chaining
                    slotDate: getCurrentDate(),
                    isRented: false,
                    startTime: `${data.startTime?.$H}/${data.startTime?.$m}/${data.startTime?.$s}`,
                    endTime: `${data.endTime?.$H}/${data.endTime?.$m}/${data.endTime?.$s}`,
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

    const getSlot = async () => {
        console.log('getSlot');
        try {
            await myAxios({
                method: 'get',
                url: `/slot/attribute/slotId/${prop}`,
            }).then((res) => {
                console.log(res.data);
                setSlotObj(res.data);
                // alert(res.data);
            });
        } catch (err) {
            alert(err.response.data);
        }
    };

    useEffect(() => {
        console.log('useEffect');
        getSlot();
    // console.log(eventObj);
    }, []);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle textAlign="center">Add Slots</DialogTitle>
                <Box component="form" onSubmit={handleSubmit(submitAddSlot)} noValidate sx={{ mt: 1, mb: 0 }}>
                    <DialogContent>
                        <DialogContentText textAlign="center">
              Create Slots for Date :
                            {' '}
                            {getCurrentDate()}
                        </DialogContentText>

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
                                                renderInput={(params) => <TextField reuquired {...params} />}
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
                            margin="normal"
                            id="outlined-select-currency"
                            name="currency"
                            select
                            label="Price"
                            value={currency}
                            onChange={handleChange1}
                            helperText="Please select your currency"
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            defaultValue={slotObj ? slotObj.price : ''}
                            autoFocus
                            margin="normal"
                            id="standard-adornment-amount"
                            label="price"
                            name="price"
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

                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              margin="normal"
              disableFuture
              label="Responsive"
              openTo="year"
              views={['year', 'month', 'day']}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider> */}

                    </DialogContent>

                    <DialogActions>
                        {/* <IconButton
              onClick={addSlot}
              color="primary"
            >
              <AddCircleRoundedIcon fontSize="large" onClick={<FormDialog />} />
            </IconButton> */}
                        <Button type="submit">Submit</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Box>
            </Dialog>

        </div>
    );
}
