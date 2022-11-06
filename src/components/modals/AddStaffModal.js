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
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import {
    MenuItem,
    Grid,
} from '@mui/material';
import myAxios from '../../config/axios';

export default function AddStaffModal({ mode,staffProp }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [staffObj, setStaffObj] = useState([]);

    console.log('staff');
    console.log(staffProp);
    const getCurrentDate = (separator = '-') => {
        const newDate = new Date();
        const date = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();

        return `${date < 10 ? `0${date}` : `${date}`}${month < 10 ? `0${month}` : `${month}`}${separator}${year}${separator}`;
    };

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

    const submitAddStaff = async (data) => {
        console.log(data);
        try {
            await myAxios({
                method: 'post',
                url: '/event',
                data: {
                    ...data,
                    joiningDate: getCurrentDate(),
                    password: '123',
                    staffId: 0,
                    venueId: 0,
                    role: 3,
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

    const getStaff = async () => {
        try {
            await myAxios({ method: 'GET', url: `/staff/id/${staffProp}` }).then((res) => {
                console.log('getStaff');
                console.log(res.data);
                setStaffObj(res.data);
            });
        } catch (err) {
            console.log('error');
            console.log(err.response);
        }
    };

    useEffect(() => {
        getStaff();
    // console.log(eventObj);
    }, []);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                {mode}
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle textAlign="center">Add Staff</DialogTitle>
                <Grid container>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(submitAddStaff)}
                        noValidate
                    >
                        <DialogContent>
                            <DialogContentText textAlign="center">
                Add Staff
                            </DialogContentText>
                            <Box sx={{
                                // p: 0.1,
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                alignItems: 'right',
                                // flexWrap: 'wrap',
                                // p: 5,
                                // m: 3,
                            }}
                            >
                                <Grid item xs={5}>
                                    <TextField
                                        defaultValue={staffObj ? staffObj.firstName : ''}
                                        autoFocus
                                        fullWidth
                                        margin="normal"
                                        id="firstname"
                                        label="First Name"
                                        name="firstname"
                                        required
                                        {...register('firstname', {
                                            required: 'First Name Required',
                                        })}
                                        error={Boolean(errors.firstname)}
                                        helperText={errors.firstname?.message}
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <TextField
                                        defaultValue={staffObj ? staffObj.lastName : ''}
                                        fullWidth
                                        margin="normal"
                                        id="lastname"
                                        label="Last Name"
                                        name="lastname"
                                        required
                                        {...register('lastname', {
                                            required: 'Last Name Required',
                                        })}
                                        error={Boolean(errors.lastname)}
                                        helperText={errors.lastname?.message}
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <TextField
                                        defaultValue={staffObj ? staffObj.email : ''}
                                        fullWidth
                                        label="Email Address"
                                        id="email"
                                        name="email"
                                        margin="normal"
                                        required
                                        {...register('email', {
                                            required: 'Email Address required.',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid Email Address',
                                            },
                                        })}
                                        error={Boolean(errors.email)}
                                        helperText={errors.email?.message}
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <TextField
                                        defaultValue={staffObj ? staffObj.contactNo : ''}
                                        fullWidth
                                        label="Contact Number"
                                        id="contactNo"
                                        name="contactNo"
                                        margin="normal"
                                        required
                                        {...register('contactNo', {
                                            required: 'Contact Number required.',
                                            pattern: {
                                                value: /^(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g,
                                                message: 'Invalid Contact Number',
                                            },
                                        })}
                                        error={Boolean(errors.contactNo)}
                                        helperText={errors.contactNo?.message}
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <TextField
                                        defaultValue={staffObj ? staffObj.salary : ''}
                                        fullWidth
                                        label="Salary"
                                        id="salary"
                                        name="salary"
                                        margin="normal"
                                        required
                                        {...register('salary', {
                                            required: 'Salary required.',
                                            pattern: {
                                                value: '^0*[1-9]\\d*$',
                                                message: 'Invalid Salary',
                                            },
                                        })}
                                        error={Boolean(errors.salary)}
                                        helperText={errors.salary?.message}
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <TextField
                                        defaultValue={staffObj ? staffObj.gender : ''}
                                        fullWidth
                                        select
                                        required
                                        id="gender"
                                        label="Gender"
                                        name="gender"
                                        margin="normal"
                                        inputstaffProps={register('gender', {
                                            required: 'Please enter gender.',
                                        })}
                                        error={errors.gender}
                                        helperText={errors.gender?.message}
                                    >
                                        <MenuItem value="Male" {...register('gender')}>Male</MenuItem>
                                        <MenuItem value="Female" {...register('gender')}>Female</MenuItem>
                                        <MenuItem value="NA" {...register('gender')}>Prefer not to say</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={5}>
                                    <Controller
                                        id="DOB"
                                        name="DOB"
                                        control={control}
                                        render={({ field: { onChange, ...restField } }) => (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <Stack spacing={3} marginTop={1}>
                                                    <DesktopDatePicker
                                                        label="Date of Birth"
                                                        inputFormat="DD/MM/YYYY"
                                                        disableFuture
                                                        onChange={(event) => { onChange(event); }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                defaultValue={staffObj ? staffObj.dob : ''}
                                                                margin="normal"
                                                                fullWidth
                                                                required
                                                                error={errors.DOB}
                                                                helperText={errors.DOB?.message}
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
                                    <TextField
                                        defaultValue={staffObj ? staffObj.groupNumber : ''}
                                        fullWidth
                                        margin="normal"
                                        id="groupNumber"
                                        name="groupNumber"
                                        label="Group Number"
                                        required
                                        {...register('groupNumber', {
                                            required: 'Group Number Required',
                                        })}
                                        error={Boolean(errors.groupNumber)}
                                        helperText={errors.groupNumber?.message}
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <TextField
                                        defaultValue={staffObj ? staffObj.accountNo : ''}
                                        fullWidth
                                        margin="normal"
                                        id="accountNo"
                                        label="Account Number"
                                        name="accountNo"
                                        required
                                        {...register('accountNo', {
                                            required: 'Account Number Required',
                                        })}
                                        error={Boolean(errors.accountNo)}
                                        helperText={errors.accountNo?.message}
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <TextField
                                        defaultValue={staffObj ? staffObj.ifsccode : ''}
                                        fullWidth
                                        margin="normal"
                                        id="IFSCCode"
                                        label="IFSC Code"
                                        name="IFSCCode"
                                        required
                                        {...register('IfscCode', {
                                            required: 'IFSC Code Required',
                                        })}
                                        error={Boolean(errors.IFSCCode)}
                                        helperText={errors.IFSCCode?.message}
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

        </div>
    );
}
