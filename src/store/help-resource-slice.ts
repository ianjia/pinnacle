import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HelpResourceTermType, NavTabType } from '../shared';
import { logoutAction } from './auth-slice';

interface HelpResourceTermState {
    activeTab: HelpResourceTermType;
}

const initialState: HelpResourceTermState = {
    activeTab: HelpResourceTermType.Help
};

const helpResourceTermTabSlice = createSlice({
    name: 'helpResourceTermTab',
    initialState,
    reducers: {
        setActiveTab(state, action: PayloadAction<HelpResourceTermType>) {
            state.activeTab = action.payload;
        }
    },

    extraReducers: builder => {
    /*  <-‑‑ this single line wipes the whole slice */
        builder.addCase(logoutAction, () => {
            return initialState;
        });
    },
});

export const helpResourceTermTabReducers = helpResourceTermTabSlice.reducer;
export const helpResourceTermTabActions = helpResourceTermTabSlice.actions;

