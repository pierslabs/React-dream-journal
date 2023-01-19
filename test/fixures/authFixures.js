export const initialState = {
  status: 'checking', //not-authenticated, authenticated, checking
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: 'authenticated',
  uid: '123456',
  email: 'demo@test.com',
  displayName: 'Demo User',
  photoURL: 'https://demouser.jpg',
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const demoUser = {
  uid: '123456',
  email: 'demo@test.com',
  displayName: 'Demo User',
  photoURL: 'https://demouser.jpg',
};
