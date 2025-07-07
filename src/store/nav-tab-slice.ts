import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavTabType } from '../shared';

interface NavigationTabState {
  activeTab:     NavTabType;
  email:         string | null;
  profileImage:  string;          // key of the chosen avatar
}

const initialState: NavigationTabState = {
  activeTab:    NavTabType.Profile,
  email:        null,
  profileImage: 'default',
};

const navigationTabSlice = createSlice({
  name: 'navigationTab',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<NavTabType>) {
      state.activeTab = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setProfileImage(state, action: PayloadAction<string>) {
      state.profileImage = action.payload;
    },
  },
});
export const navigationTabReducers  = navigationTabSlice.reducer;
export const navigationTabActions   = navigationTabSlice.actions;

