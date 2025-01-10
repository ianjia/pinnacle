import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
  isOpen: boolean;
  title: string;
  message: string;
}

const initialState: AlertState = {
  isOpen: false,
  title: '',
  message: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<{ title: string; message: string }>) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
    hideAlert: (state) => {
      state.isOpen = false;
      state.title = '';
      state.message = '';
    },
  },
});


export const alertDialogReducers = alertSlice.reducer;
export const alertDialogActions = alertSlice.actions;

