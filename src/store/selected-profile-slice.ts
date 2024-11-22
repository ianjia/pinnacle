
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileType } from '../shared';

interface selectedProfileState {
    activeProfile: ProfileType;
}

const initialState: selectedProfileState = {
    activeProfile: ProfileType.Student,
};

const selectedProfileSlice = createSlice({
    name: 'selectedProfile',
    initialState,
    reducers: {
        setSelectedProfile(state, action: PayloadAction<ProfileType>) {
            state.activeProfile = action.payload;
        }
    }
});

export const selectedProfileReducers = selectedProfileSlice.reducer;
export const selectedProfileActions = selectedProfileSlice.actions;