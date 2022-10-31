/* eslint-disable max-len */
import { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel, Avatar,
  IconButton, InputAdornment, Radio, RadioGroup,
  Button,
  TextField,
  FormControlLabel,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Stack,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useForm } from 'react-hook-form';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function RegisterForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState('');
  const [DOB, setDOB] = useState(new Date());

  const handleClickShowPassword = () => setShowPassword(() => !showPassword);
  const handleGenderChange = (e) => {
    console.log(e.target.value);
    setGender(e.target.value);
  };
  const handleDOBChange = (newDOB) => {
    const d = `${newDOB.$D}/${newDOB.$M + 1}/${newDOB.$y}`;
    console.log(d);
    setDOB(d);
  };

  function eyeButton() {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  }

  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm();

  console.log('render');
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5"> Register </Typography>

        {/* FORM */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>

          <TextField
            label="First Name"
            id="firstName"
            name="firstName"
            margin="normal"
            required
            fullWidth
            autoFocus
            {...register('firstName', {
              required: 'First Name required.',
            })}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="Last Name"
            id="lastName"
            name="lastName"
            margin="normal"
            required
            fullWidth
            autoFocus
            {...register('lastName', {
              required: 'Last Name required.',
            })}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
          />

          {/* EMAIL */}
          <TextField
            label="Email Address"
            id="email"
            name="email"
            margin="normal"
            required
            fullWidth
            autoFocus
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

          {/* PASSSWORD */}
          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            id="password"
            required
            fullWidth
            InputProps={{
              endAdornment: eyeButton(),
            }}
            {...register('password', {
              required: 'Password required.',
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />

          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              id="gender"
              label="Gender"
              name="gender"
              autoWidth
              onChange={handleGenderChange}
              value={gender}
            >
              <MenuItem value="Male" {...register('gender')}>Male</MenuItem>
              <MenuItem value="Female" {...register('gender')}>Female</MenuItem>
              <MenuItem value="NA" {...register('gender')}>Prefer not to say</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date of Birth"
              inputFormat="DD/MM/YYYY"
              name="DOB"
              id="DOB"
              maxDate={new Date()}
              fullWidth
              onChange={handleDOBChange}
              value={DOB}
              {...register('DOB')}
              renderInput={(params) => (
                <TextField
                  name="DOB"
                  id="DOB"
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          {/* ROLE */}
          <FormControl
            name="typeUser"
            error={(Boolean(errors.typeUser))}
            fullWidth
            sx={{
              mt: 5,
            }}
          >
            <FormLabel>Register as: </FormLabel>
            <RadioGroup
              row
              name="typeUser"
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <FormControlLabel value="Audience" control={<Radio {...register('typeUser', { required: 'Choose your role' })} />} label="Audience" />
              <FormControlLabel value="Artist Manager" control={<Radio {...register('typeUser', { required: 'Choose your role' })} />} label="Artist Manager" />
            </RadioGroup>
            <FormHelperText style={{ color: '#d32f2f' }}>{errors.typeUser?.message}</FormHelperText>
          </FormControl>

          {/* SUBMIT */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>

          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>

        </Box>
      </Box>
    </Container>
  );
}
