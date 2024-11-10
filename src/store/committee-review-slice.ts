import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommitteeReviewState {
    review_result: string | undefined;
    college_to_evaluate: string;
    major_to_evalute: string; 
}

const initialState: CommitteeReviewState = {
    review_result: undefined,
    college_to_evaluate: "",
    major_to_evalute: "No Preference",
};

const committeeReviewSlice = createSlice({
    name: 'committeeReview',
    initialState,
    reducers: {
        setCollegeToEvaluate: (state, action: PayloadAction<string>) => {
            state.college_to_evaluate = action.payload;
        },

        setMajorToEvaluate: (state, action: PayloadAction<string>) => {
            state.major_to_evalute = action.payload;
        },

        setReviewResult: (state, action: PayloadAction<string>) => {
            state.review_result = action.payload;
        }
    },
});

export const committeeReviewReducers = committeeReviewSlice.reducer;
export const committeeReviewActions = committeeReviewSlice.actions;
