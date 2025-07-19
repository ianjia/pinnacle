import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommitteeReview, CommitteeReviewWorkshopType } from '../shared';
import { logoutAction } from './auth-slice';

interface CommitteeReviewState {
    liveReviewResult: string;
    liveReviewCollege: string;
    liveReviewMajor: string;
    liveReviewId: number;
    activeCommitteeReviewWorkshop: CommitteeReviewWorkshopType;
    committeeReviewHistory: CommitteeReview[];
}

const initialState: CommitteeReviewState = {
    liveReviewResult: "",
    liveReviewCollege: "",
    liveReviewMajor: "No Preference",
    liveReviewId: 0, // Place holder, will be updated on inserting review into backend database,
    activeCommitteeReviewWorkshop: CommitteeReviewWorkshopType.CurrentReview,
    committeeReviewHistory: [],
};

const committeeReviewSlice = createSlice({
    name: 'committeeReview',
    initialState,
    reducers: {
      setActiveCommitteeReviewWorkshop: (
        state,
        action: PayloadAction<CommitteeReviewWorkshopType>
        ) => {
        state.activeCommitteeReviewWorkshop = action.payload;
      },

      setCommitteeReviewHistory(state, action: PayloadAction<CommitteeReview[]>) {
        state.committeeReviewHistory = action.payload;
      },
  
      deleteReviewFromHistory(state, action: PayloadAction<number>) {
        state.committeeReviewHistory = state.committeeReviewHistory.filter(review => review.id !== action.payload);
        if (action.payload === state.liveReviewId) {
            committeeReviewSlice.caseReducers.resetLiveReview(state);
        }
      },
  
      addReviewToHistory(state, action: PayloadAction<CommitteeReview>) {
        state.committeeReviewHistory.push(action.payload);
      },

      setLiveReviewCollege: (state, action: PayloadAction<string>) => {
        state.liveReviewCollege = action.payload;
      },
  
      setLiveReviewMajor: (state, action: PayloadAction<string>) => {
        state.liveReviewMajor = action.payload;
      },
  
      setLiveReviewResult: (state, action: PayloadAction<string>) => {
        state.liveReviewResult = action.payload;
      },
  
      setLiveReviewId: (state, action: PayloadAction<number>) => {
        state.liveReviewId = action.payload;
      },
  
      resetLiveReview: (state) => {
        state.liveReviewResult = "";
        state.liveReviewId = 0;
      },
    },

    extraReducers: builder => {
    /*  <-‑‑ this single line wipes the whole slice */
        builder.addCase(logoutAction, () => {
            return initialState;
        });
    },

  });

export const committeeReviewReducers = committeeReviewSlice.reducer;
export const committeeReviewActions = committeeReviewSlice.actions;
