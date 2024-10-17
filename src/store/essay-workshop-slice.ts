
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EssayWorkshopType } from '../common';

interface essayWorkshopState {
    activeWorkshop: EssayWorkshopType;
}

const initialState: essayWorkshopState = {
    activeWorkshop: EssayWorkshopType.Brainstorming,
};

const essayWorkshopSlice = createSlice({
    name: 'essayWorkshop',
    initialState,
    reducers: {
        setEssayWorkshop(state, action: PayloadAction<EssayWorkshopType>) {
            state.activeWorkshop = action.payload;
        }
    }
});

export const essayWorkshopReducers = essayWorkshopSlice.reducer;
export const essayWorkshopActions = essayWorkshopSlice.actions;