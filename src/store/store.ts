import { configureStore } from '@reduxjs/toolkit';
import { navigationTabReducers } from './nav-tab-slice';

export const store = configureStore({
  reducer: {
    navigationTab: navigationTabReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
