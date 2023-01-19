import getEnvironments from './src/helpers/getEnviroments';
import 'whatwg-fetch';
import 'setimmediate';
require('dotenv').config({
  path: './test.env',
});

jest.mock('./src/helpers/getEnviroments', () => ({
  getEnvironments: () => ({ ...process.env }),
}));
