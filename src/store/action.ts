import {createAction} from '@reduxjs/toolkit';

import {Route} from '../types/app-type';

export const redirectToRoute = createAction<Route>('app/redirectToRoute');
