import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommitteeReviewState {
    review_result: string | undefined;
    college: string;
    major: string; 
}

const initialState: CommitteeReviewState = {
    review_result: undefined,
    college: "",
    major: "No Preference",
};

const committeeReviewSlice = createSlice({
    name: 'committeeReview',
    initialState,
    reducers: {
        setCollege: (state, action: PayloadAction<string>) => {
            state.college = action.payload;
        },

        setMajor: (state, action: PayloadAction<string>) => {
            state.major = action.payload;
        },

        setReviewResult: (state, action: PayloadAction<string>) => {
            state.review_result = action.payload;
        }
    },
});

export const committeeReviewReducers = committeeReviewSlice.reducer;
export const committeeReviewActions = committeeReviewSlice.actions;
