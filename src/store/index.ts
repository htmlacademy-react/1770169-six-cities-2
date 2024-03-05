import {configureStore} from '@reduxjs/toolkit';

import {redirect} from './middleware/redirect';
import {reducer} from './reducer';
import {createAPI} from '../services/api';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect)
});
