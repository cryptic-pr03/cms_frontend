import {
  MenuItem,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
  Box,
  DialogTitle
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import myAxios, { myPrivateAxios } from '../../config/axios';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { getCurrentUser } from '../../helpers/AuthManager';

export default function AddStaffModal({ mode, staffProp, updateState }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);


  const [venueList, setVenueList] = useState([]);

  const getVenueList = async () => {
    await myPrivateAxios({
      method: 'get',
      url: '/venue/all',
    }).then((res) => {
      console.log(res.data);
      setVenueList(res.data);
    }).catch((err) => console(err.response));
  };
  useEffect(() => {
    getVenueList();
  }, []);

  const token = getCurrentUser();
  console.log(token);

  console.log('staff');
  console.log(staffProp);
  const getCurrentDate = (separator = '-') => {
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    const d = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`;
    console.log(d);
    return d;
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

  const handleOnSubmit = async (data) => {
    setloading(true);
    console.log(data);
    data = {
      ...data,
      DOB: `0${data.DOB?.$y}`.slice(-4) + "-" + `0${data.DOB?.$M + 1}`.slice(-2) + "-" + `0${data.DOB?.$D}`.slice(-2),
      joiningDate: getCurrentDate(),
      staffId: 0,
      role: token.typeUserCode - 1,
    },
      console.log(data);
    await myPrivateAxios({
      method: 'post',
      url: '/staff',
      data
    }).then((res) => {
      console.log("res", res.data);
      setOpen(false);
      setloading(false);
      updateState(res.data);
    }).catch((err) => console.log(err.response));
  };

  console.log(venueList);
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
        <DialogTitle textAlign="center">Add Staff</DialogTitle>
        <Grid container>
          <Box
            component="form"
            onSubmit={handleSubmit(handleOnSubmit)}
            noValidate
          >
            <DialogContent>
              <DialogContentText textAlign="center">
                Add Staff
              </DialogContentText>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                alignContent: 'space-around'
              }}
              >
                <Grid item xs={5}>
                  <TextField
                    defaultValue={staffProp?.firstName}
                    autoFocus
                    fullWidth
                    margin="normal"
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    required
                    {...register('firstName', { required: 'First Name Required', })}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName?.message}
                  />
                </Grid>

                <Grid item xs={5}>
                  <TextField
                    defaultValue={staffProp?.lastName}
                    fullWidth
                    margin="normal"
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    required
                    {...register('lastName', { required: 'Last Name Required', })}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName?.message}
                  />
                </Grid>

                <Grid item xs={5}>
                  <TextField
                    defaultValue={staffProp?.email}
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
                    defaultValue={staffProp?.contactNo}
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
                    defaultValue={staffProp?.salary}
                    fullWidth
                    label="Salary"
                    id="salary"
                    name="salary"
                    margin="normal"
                    type="number"
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
                  <Controller
                    id="DOB"
                    name="DOB"
                    control={control}
                    defaultValue={staffProp?.dob}
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
                                defaultValue={staffProp?.dob}
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
                    defaultValue={staffProp?.accountNo}
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
                    defaultValue={staffProp?.IFSCCode}
                    fullWidth
                    margin="normal"
                    id="IFSCCode"
                    label="IFSC Code"
                    name="IFSCCode"
                    required
                    {...register('IFSCCode', {
                      required: 'IFSC Code Required',
                    })}
                    error={Boolean(errors.IFSCCode)}
                    helperText={errors.IFSCCode?.message}
                  />
                </Grid>

                <Grid item xs={5}>
                  <TextField
                    select
                    fullWidth
                    required
                    id='gender'
                    name='gender'
                    label="Gender"
                    defaultValue={staffProp?.gender ?? "Male"}
                    inputProps={register('gender', {
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
                  <TextField
                    select
                    fullWidth
                    required
                    id='groupNumber'
                    name='groupNumber'
                    label="Group"
                    defaultValue={staffProp?.groupNumber ?? "0"}
                    inputProps={
                      register('groupNumber', { required: 'Please Select Group.', })
                    }
                    error={errors.groupNumber}
                    helperText={errors.groupNumber?.message}
                  >
                    <MenuItem value={1} {...register('gender')}>Group 1</MenuItem>
                    <MenuItem value={2} {...register('gender')}>Group 2</MenuItem>
                    <MenuItem value={0} disabled={token.typeUserCode == 4}{...register('gender')}>Group 0</MenuItem>
                  </TextField>
                </Grid>


                <Grid item xs={5}>
                  <TextField
                    select
                    fullWidth
                    required
                    id='venueId'
                    name='venueId'
                    label="Venue"
                    defaultValue={staffProp?.venueId ?? token.user.venueId}
                    inputProps={
                      register('venueId', { required: 'Please Select Venue.', })
                    }
                    // (token.typeUserCode == 4) ? { readOnly: true, className: "Mui-disabled" } : {}
                    error={errors.venueId}
                    helperText={errors.venueId?.message}
                  >
                    {venueList.map((venue) => {
                      return <MenuItem value={venue.venueId} key={venue.venueId} {...register('venueId')}>{venue.name}</MenuItem>
                    })}
                  </TextField>
                </Grid>
              </Box>



            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} >Cancel</Button>
              <Button type="submit" >Submit</Button>
            </DialogActions>

          </Box>
        </Grid>
      </Dialog >

    </>
  );
}
