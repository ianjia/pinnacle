import { configureStore } from '@reduxjs/toolkit';
import { navigationTabReducers } from './nav-tab-slice';
import { committeeReviewReducers }  from './committee-review-slice';
import { intervieConverstationReducers } from './interview-slice';
import { selectedProfileReducers } from './selected-profile-slice';
import { essayWorkshopReducers } from './essay-workshop-slice';
import { collegeListWorkshopReducers } from './college-list-slice';
import { collegePreferencesReducers } from './college-preference-slice';
import { userReducers } from './user-slice';

export const store = configureStore({
  reducer: {
    navigationTab: navigationTabReducers,
    selectedProfile: selectedProfileReducers,
    committeeReview: committeeReviewReducers,
    conversation: intervieConverstationReducers,
    essayWorkshop: essayWorkshopReducers,
    collegeListWorkshop: collegeListWorkshopReducers,
    collegePreferences: collegePreferencesReducers,
    user: userReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
