import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginUSerWithEmailPassword,
} from '../../store/Auth';
import { useForm } from '../../hooks';

import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import AuthLayout from '../layout/AuthLayout';

const formData = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const dispatch = useDispatch();

  const { email, password, formState, onInputChange } = useForm(formData);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(checkingAuthentication());
    dispatch(startLoginUSerWithEmailPassword(formState));
  };

  const onGoogleSigIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} aria-label="submitForm">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="email"
              type="email"
              placeholder="email@email.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
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
              inputProps={{
                'data-testid': 'password',
              }}
            />
          </Grid>

          <Grid
            container
            spacing={1}
            sx={{ mb: 2, mt: 1, display: errorMessage ? '' : 'none' }}
          >
            <Grid item xs={12} sm={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={!!isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={!!isAuthenticating}
                variant="contained"
                onClick={onGoogleSigIn}
                fullWidth
                aria-label="google-btn"
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end" sx={{ mt: 2 }}>
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Create account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
