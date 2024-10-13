import { configureStore } from '@reduxjs/toolkit';
import { navigationTabReducers } from './nav-tab-slice';
import { committeeReviewReducers }  from './comittee-review-slice';
import { intervieConverstationReducers } from './interview-slice';

export const store = configureStore({
  reducer: {
    navigationTab: navigationTabReducers,
    committeeReview: committeeReviewReducers,
    conversation: intervieConverstationReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
