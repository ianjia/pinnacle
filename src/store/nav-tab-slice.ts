import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavTabType } from '../common';

interface NavigationTabState {
    activeTab: NavTabType;
}

const initialState: NavigationTabState = {
    activeTab: NavTabType.CollegeNavigatoin,
};

const navigationTabSlice = createSlice({
    name: 'navigationTab',
    initialState,
    reducers: {
        setActiveTab(state, action: PayloadAction<NavTabType>) {
            state.activeTab = action.payload;
        }
    }
});

export const navigationTabReducers = navigationTabSlice.reducer;
export const navigationTabActions = navigationTabSlice.actions;

