import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    userId: number | null;
}

const initialState: UserState = {
    userId: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state,  action: PayloadAction<number>) => {
            state.userId = action.payload;
          },
    }
});

export const userReducers = userSlice.reducer;
export const userActions = userSlice.actions;

