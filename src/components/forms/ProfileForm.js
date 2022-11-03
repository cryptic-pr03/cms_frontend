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
  MenuItem,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { Controller, useForm } from 'react-hook-form';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function ProfileForm({ onSubmit, profile }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(() => !showPassword);

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
    register, watch, handleSubmit, formState: { errors }, control,
  } = useForm();
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginY: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5"> Profile </Typography>

        {/* FORM */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, mb: 0 }}>
          <Stack sx={{ width: 350 }} spacing={1}>
            <TextField
              label="First Name"
              id="firstName"
              name="firstName"
              margin="normal"
              required
              fullWidth
              value={profile.data}
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

            <TextField
              label="Contact Number"
              id="contactNo"
              name="contactNo"
              margin="normal"
              required
              fullWidth
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

            <TextField
              select
              fullWidth
              required
              label="Gender"
              defaultValue=""
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

            <Controller
              name="DOB"
              control={control}
              render={
                ({ field: { onChange, ...restField } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Date of Birth"
                      inputFormat="DD/MM/YYYY"
                      disableFuture
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

            {/* ROLE */}
            <FormControl
              name="typeUserCode"
              error={(Boolean(errors.typeUserCode))}
              fullWidth
              sx={{
                mt: 5,
              }}
            >
              <FormLabel>Register as: </FormLabel>
              <RadioGroup
                row
                name="typeUserCode"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                <FormControlLabel value={1} control={<Radio {...register('typeUserCode', { required: 'Choose your role' })} />} label="Audience" />
                <FormControlLabel value={2} control={<Radio {...register('typeUserCode', { required: 'Choose your role' })} />} label="Artist Manager" />
              </RadioGroup>
              <FormHelperText style={{ color: '#d32f2f' }}>{errors.typeUserCode?.message}</FormHelperText>
            </FormControl>
          </Stack>
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
