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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useForm } from 'react-hook-form';

export default function LoginForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(() => !showPassword);
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
    register, handleSubmit, formState: { errors },
  } = useForm();

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
        <Typography component="h1" variant="h5"> Sign in </Typography>

        {/* FORM */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>

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

          {/* ROLE */}
          <FormControl
            name="typeUserCode"
            error={(Boolean(errors.typeUserCode))}
            fullWidth
            sx={{
              mt: 5,
            }}
          >
            <FormLabel>Login as: </FormLabel>
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
              <FormControlLabel value={3} control={<Radio {...register('typeUserCode', { required: 'Choose your role' })} />} label="Staff" />
            </RadioGroup>
            <FormHelperText style={{ color: '#d32f2f' }}>{errors.typeUserCode?.message}</FormHelperText>
          </FormControl>

          {/* SUBMIT */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                Dont have an account? Sign Up
              </Link>
            </Grid>
          </Grid>

        </Box>
      </Box>
    </Container>
  );
}
