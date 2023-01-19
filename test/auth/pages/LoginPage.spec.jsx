import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/Auth';
import { startGoogleSignIn } from '../../../src/store/Auth/thunks';
import { notAuthenticatedState } from '../../fixures/authFixures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/Auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginUSerWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
  checkingAuthentication: () => jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe('LoginPage', () => {
  beforeEach(() => jest.clearAllMocks());
  test('should show loginPage correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Login').length).toBeGreaterThan(1);
    expect(container).toMatchSnapshot();
  });

  test('should show GoogleLogin when click button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const buttonElement = screen.getByLabelText('google-btn');
    fireEvent.click(buttonElement);
    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test('should starLoginSubmit when submit', () => {
    const email = 'pedro@google.com';
    const password = '123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'email' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } });

    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField, {
      target: { name: 'password', value: password },
    });

    const loginForm = screen.getByLabelText('submitForm');
    fireEvent.submit(loginForm);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email: email,
      password: password,
    });
  });
});
