import { useMemo, useState } from 'react';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import AuthLayout from '../layout/AuthLayout';
import { startRegisterUserEmailPassord } from '../../store/Auth/thunks';

const formData = {
  email: '',
  password: '',
  displayName: '',
};

const emailRegexp =
  /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const formValidations = {
  email: [(value) => value.match(emailRegexp), 'The email must have an @.'],
  password: [
    (value) => value.length >= 6,
    'The password must have 6 characters.',
  ],
  displayName: [
    (value) => value.length >= 1,
    'The name must have 1 characters.',
  ],
};

const RegisterPage = () => {
  const [formSubmited, setFormSubmited] = useState(false);
  const { status, errorMessage } = useSelector((state) => state.auth);

  const isCheckingAuthentication = useMemo(
    () => status === 'checking',
    [status]
  );

  const dispatch = useDispatch();
  const {
    email,
    password,
    displayName,
    formState,
    displayNameValid,
    emailValid,
    passwordValid,
    isFormValid,
    onInputChange,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);
    if (!isFormValid) return;

    dispatch(startRegisterUserEmailPassord(formState));
  };

  return (
    <AuthLayout title="Register">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="Name"
              placeholder="Full Name"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="email"
              type="email"
              placeholder="email@email.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmited}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="password"
              type="password"
              placeholder="password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
            />
          </Grid>

          <Grid
            container
            spacing={1}
            sx={{ mb: 2, mt: 1 }}
            display={!!errorMessage ? '' : 'none'}
          >
            <Grid item xs={12} sm={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Create account
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end" sx={{ mt: 2 }}>
            <Typography sx={{ mr: 2 }}> You have an account?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Go to login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
