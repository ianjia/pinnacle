import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

/* ------------------------------------------------------------------ */
/*  Global logout action                                              */
/* ------------------------------------------------------------------ */
export const logoutAction = createAction('auth/logout');

/* ------------------------------------------------------------------ */
/*  State                                                              */
/* ------------------------------------------------------------------ */
interface AuthState { // Nothing defined here, as auth was handled by auth context and provider
}

const initialState: AuthState = {
};

/* ------------------------------------------------------------------ */
/*  Slice                                                              */
/* ------------------------------------------------------------------ */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },

  /* Reset the slice whenever logoutAction is dispatched */
  extraReducers: builder => {
    builder.addCase(logoutAction, () => initialState);
  },
});

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */
export const authActions = {
  ...authSlice.actions,         
  logout: logoutAction,          // convenience re‑export
};

export const authReducers = authSlice.reducer;
