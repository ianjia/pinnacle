import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HelpResourceTermType, NavTabType } from '../shared';

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
    }
});

export const helpResourceTermTabReducers = helpResourceTermTabSlice.reducer;
export const helpResourceTermTabActions = helpResourceTermTabSlice.actions;

