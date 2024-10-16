import { configureStore } from '@reduxjs/toolkit';
import { navigationTabReducers } from './nav-tab-slice';
import { committeeReviewReducers }  from './comittee-review-slice';
import { intervieConverstationReducers } from './interview-slice';
import { selectedProfileReducers } from './selected-profile-slice';

export const store = configureStore({
  reducer: {
    navigationTab: navigationTabReducers,
    selectedProfile: selectedProfileReducers,
    committeeReview: committeeReviewReducers,
    conversation: intervieConverstationReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
