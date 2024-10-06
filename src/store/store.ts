import { configureStore } from '@reduxjs/toolkit';
import { navigationTabReducers } from './nav-tab-slice';
import committeeReviewReducer from './comittee-review-slice';


export const store = configureStore({
  reducer: {
    navigationTab: navigationTabReducers,
    committeeReview: committeeReviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
